import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  type: text("type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  type: true,
  message: true,
}).extend({
  email: z.string().email("正しいメールアドレスを入力してください"),
  name: z.string().min(1, "お名前を入力してください").max(100, "お名前は100文字以内で入力してください"),
  type: z.enum(["受託開発", "自社サービス開発", "DX・ITコンサル", "その他"], {
    errorMap: () => ({ message: "お問い合わせ種別を選択してください" })
  }),
  message: z.string().min(10, "メッセージは10文字以上入力してください").max(2000, "メッセージは2000文字以内で入力してください")
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
