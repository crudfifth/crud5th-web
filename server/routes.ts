import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint (現在はEmailJSを使用しているためコメントアウト)
  /*
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Create contact entry
      const contact = await storage.createContact(validatedData);
      
      // Log the contact submission (in production, you might want to send an email or notification)
      console.log("New contact form submission:", {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        type: contact.type,
        timestamp: contact.createdAt
      });
      
      res.status(201).json({ 
        success: true, 
        message: "お問い合わせを受け付けました。後日担当者よりご連絡いたします。",
        id: contact.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "入力内容に問題があります。", 
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      } else {
        console.error("Contact form submission error:", error);
        res.status(500).json({ 
          success: false, 
          message: "サーバーでエラーが発生しました。しばらく時間をおいてから再度お試しください。" 
        });
      }
    }
  });
  */

  // Get all contacts (for admin purposes - in production you might want to add authentication)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json({ 
        success: true,
        data: contacts,
        count: contacts.length
      });
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ 
        success: false, 
        message: "サーバーでエラーが発生しました。" 
      });
    }
  });

  // Get contact by ID
  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const contact = await storage.getContactById(req.params.id);
      if (!contact) {
        res.status(404).json({
          success: false,
          message: "指定されたお問い合わせが見つかりません。"
        });
        return;
      }
      
      res.json({
        success: true,
        data: contact
      });
    } catch (error) {
      console.error("Get contact by ID error:", error);
      res.status(500).json({ 
        success: false, 
        message: "サーバーでエラーが発生しました。" 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      success: true,
      message: "CRUD5th API is running",
      timestamp: new Date().toISOString()
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
