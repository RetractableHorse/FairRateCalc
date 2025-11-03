import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      res.json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid transaction data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create transaction" });
      }
    }
  });

  app.get("/api/transactions", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const transactions = await storage.getAllTransactions(limit);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.get("/api/transactions/:id", async (req, res) => {
    try {
      const transaction = await storage.getTransaction(req.params.id);
      if (!transaction) {
        res.status(404).json({ error: "Transaction not found" });
        return;
      }
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transaction" });
    }
  });

  app.post("/api/square/payment", async (req, res) => {
    try {
      const { amount, transactionId } = req.body;
      
      if (!process.env.SQUARE_ACCESS_TOKEN) {
        res.status(503).json({ 
          error: "Square not configured", 
          message: "Please add SQUARE_ACCESS_TOKEN to environment secrets" 
        });
        return;
      }

      res.status(501).json({
        error: "Not implemented",
        message: "Square payment integration ready for configuration. Add SQUARE_ACCESS_TOKEN to enable.",
      });
    } catch (error) {
      res.status(500).json({ error: "Payment processing failed" });
    }
  });

  app.post("/api/square/receipt", async (req, res) => {
    try {
      const { email, transactionId } = req.body;
      
      if (!process.env.SQUARE_ACCESS_TOKEN) {
        res.status(503).json({ 
          error: "Square not configured", 
          message: "Please add SQUARE_ACCESS_TOKEN to environment secrets" 
        });
        return;
      }

      res.status(501).json({
        error: "Not implemented",
        message: "Email receipt integration ready for configuration.",
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to send receipt" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
