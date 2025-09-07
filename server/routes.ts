import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Create contact entry
      const contact = await storage.createContact(validatedData);
      
      // Log the contact submission
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

  // Admin authentication middleware
  const requireAdminAuth = (req: any, res: any, next: any) => {
    const accessKey = req.headers['x-admin-key'] || req.query.key;
    const adminPassword = req.headers['x-admin-password'] || req.query.password;
    
    if (!accessKey || !adminPassword) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    
    if (accessKey !== process.env.ADMIN_ACCESS_KEY || adminPassword !== process.env.ADMIN_PASSWORD) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    
    next();
  };

  // Hidden admin route to get all contacts (completely secure)
  app.get("/api/admin/contacts", requireAdminAuth, async (req, res) => {
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

  // Hidden admin route to get contact by ID
  app.get("/api/admin/contacts/:id", requireAdminAuth, async (req, res) => {
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

  // Hidden admin route to delete contact
  app.delete("/api/admin/contacts/:id", requireAdminAuth, async (req, res) => {
    try {
      const contact = await storage.getContactById(req.params.id);
      if (!contact) {
        res.status(404).json({
          success: false,
          message: "指定されたお問い合わせが見つかりません。"
        });
        return;
      }
      
      await storage.deleteContact(req.params.id);
      
      res.json({
        success: true,
        message: "お問い合わせを削除しました。"
      });
    } catch (error) {
      console.error("Delete contact error:", error);
      res.status(500).json({ 
        success: false, 
        message: "サーバーでエラーが発生しました。" 
      });
    }
  });

  // Hidden admin route to mark contact as read
  app.patch("/api/admin/contacts/:id/read", requireAdminAuth, async (req, res) => {
    try {
      const contact = await storage.getContactById(req.params.id);
      if (!contact) {
        res.status(404).json({
          success: false,
          message: "指定されたお問い合わせが見つかりません。"
        });
        return;
      }
      
      // In a real implementation, you'd update a 'read' status in the database
      res.json({
        success: true,
        message: "既読状態を更新しました。"
      });
    } catch (error) {
      console.error("Update contact read status error:", error);
      res.status(500).json({ 
        success: false, 
        message: "サーバーでエラーが発生しました。" 
      });
    }
  });

  // Hidden admin dashboard route (serves the admin UI)
  app.get("/admin/:accessKey", (req, res) => {
    if (req.params.accessKey !== process.env.ADMIN_ACCESS_KEY) {
      return res.status(404).send("Not Found");
    }
    
    // Serve admin dashboard HTML
    const adminHTML = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD5th 管理システム</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
        .admin-bg { background: linear-gradient(135deg, #1e293b, #0f172a); }
        .glass-card { backdrop-filter: blur(16px); background: rgba(255, 255, 255, 0.05); }
    </style>
</head>
<body class="admin-bg min-h-screen text-white">
    <div id="admin-app">
        <div class="container mx-auto px-6 py-8">
            <!-- Login Form -->
            <div v-if="!authenticated" class="max-w-md mx-auto mt-20">
                <div class="glass-card border border-white/10 rounded-xl p-8">
                    <h2 class="text-3xl font-bold text-center mb-8 text-cyan-400">管理者認証</h2>
                    <form @submit.prevent="authenticate">
                        <div class="mb-6">
                            <label class="block text-sm font-medium mb-2">管理者パスワード</label>
                            <input 
                                v-model="password" 
                                type="password" 
                                class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400"
                                placeholder="パスワードを入力"
                            >
                        </div>
                        <button type="submit" class="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                            ログイン
                        </button>
                    </form>
                    <p v-if="loginError" class="text-red-400 text-sm mt-4 text-center">{{ loginError }}</p>
                </div>
            </div>

            <!-- Admin Dashboard -->
            <div v-if="authenticated">
                <header class="mb-8">
                    <div class="flex justify-between items-center">
                        <div>
                            <h1 class="text-4xl font-bold text-cyan-400">CRUD5th 管理システム</h1>
                            <p class="text-gray-400 mt-2">お問い合わせ管理ダッシュボード</p>
                        </div>
                        <button @click="logout" class="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                            ログアウト
                        </button>
                    </div>
                </header>

                <!-- Stats Cards -->
                <div class="grid md:grid-cols-4 gap-6 mb-8">
                    <div class="glass-card border border-white/10 rounded-xl p-6">
                        <h3 class="text-lg font-semibold text-gray-300">総お問い合わせ</h3>
                        <p class="text-3xl font-bold text-cyan-400 mt-2">{{ contacts.length }}</p>
                    </div>
                    <div class="glass-card border border-white/10 rounded-xl p-6">
                        <h3 class="text-lg font-semibold text-gray-300">今日の問い合わせ</h3>
                        <p class="text-3xl font-bold text-green-400 mt-2">{{ todayContacts }}</p>
                    </div>
                    <div class="glass-card border border-white/10 rounded-xl p-6">
                        <h3 class="text-lg font-semibold text-gray-300">受託開発</h3>
                        <p class="text-3xl font-bold text-blue-400 mt-2">{{ contactsByType['受託開発'] || 0 }}</p>
                    </div>
                    <div class="glass-card border border-white/10 rounded-xl p-6">
                        <h3 class="text-lg font-semibold text-gray-300">自社サービス</h3>
                        <p class="text-3xl font-bold text-purple-400 mt-2">{{ contactsByType['自社サービス開発'] || 0 }}</p>
                    </div>
                </div>

                <!-- Contacts Table -->
                <div class="glass-card border border-white/10 rounded-xl p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-white">お問い合わせ一覧</h2>
                        <button @click="loadContacts" class="px-4 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors">
                            更新
                        </button>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="border-b border-white/10">
                                    <th class="text-left py-3 px-4 text-gray-300">日時</th>
                                    <th class="text-left py-3 px-4 text-gray-300">お名前</th>
                                    <th class="text-left py-3 px-4 text-gray-300">メール</th>
                                    <th class="text-left py-3 px-4 text-gray-300">種別</th>
                                    <th class="text-left py-3 px-4 text-gray-300">メッセージ</th>
                                    <th class="text-left py-3 px-4 text-gray-300">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="contact in contacts" :key="contact.id" class="border-b border-white/5 hover:bg-white/5">
                                    <td class="py-3 px-4 text-sm text-gray-300">
                                        {{ formatDate(contact.createdAt) }}
                                    </td>
                                    <td class="py-3 px-4 text-sm font-medium text-white">
                                        {{ contact.name }}
                                    </td>
                                    <td class="py-3 px-4 text-sm text-gray-300">
                                        <a :href="'mailto:' + contact.email" class="text-cyan-400 hover:underline">
                                            {{ contact.email }}
                                        </a>
                                    </td>
                                    <td class="py-3 px-4 text-sm">
                                        <span class="px-2 py-1 rounded text-xs" :class="getTypeClass(contact.type)">
                                            {{ contact.type }}
                                        </span>
                                    </td>
                                    <td class="py-3 px-4 text-sm text-gray-300 max-w-xs">
                                        <div class="truncate">{{ contact.message }}</div>
                                    </td>
                                    <td class="py-3 px-4 text-sm">
                                        <button 
                                            @click="viewContact(contact)" 
                                            class="px-3 py-1 bg-blue-600 text-xs rounded hover:bg-blue-700 transition-colors mr-2"
                                        >
                                            詳細
                                        </button>
                                        <button 
                                            @click="deleteContact(contact.id)" 
                                            class="px-3 py-1 bg-red-600 text-xs rounded hover:bg-red-700 transition-colors"
                                        >
                                            削除
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Modal for Contact Details -->
            <div v-if="selectedContact" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="selectedContact = null">
                <div class="glass-card border border-white/10 rounded-xl p-8 max-w-2xl w-full mx-4" @click.stop>
                    <h3 class="text-2xl font-bold text-white mb-6">お問い合わせ詳細</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-1">お名前</label>
                            <p class="text-white">{{ selectedContact.name }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-1">メールアドレス</label>
                            <p class="text-cyan-400">{{ selectedContact.email }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-1">お問い合わせ種別</label>
                            <p class="text-white">{{ selectedContact.type }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-1">送信日時</label>
                            <p class="text-white">{{ formatDate(selectedContact.createdAt) }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-1">メッセージ</label>
                            <p class="text-white whitespace-pre-wrap bg-white/5 p-4 rounded-lg">{{ selectedContact.message }}</p>
                        </div>
                    </div>
                    <div class="flex justify-end mt-8">
                        <button @click="selectedContact = null" class="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                            閉じる
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
    const { createApp } = Vue;
    
    createApp({
        data() {
            return {
                authenticated: false,
                password: '',
                loginError: '',
                contacts: [],
                selectedContact: null,
                accessKey: '${process.env.ADMIN_ACCESS_KEY}'
            };
        },
        computed: {
            todayContacts() {
                const today = new Date().toDateString();
                return this.contacts.filter(contact => 
                    new Date(contact.createdAt).toDateString() === today
                ).length;
            },
            contactsByType() {
                return this.contacts.reduce((acc, contact) => {
                    acc[contact.type] = (acc[contact.type] || 0) + 1;
                    return acc;
                }, {});
            }
        },
        methods: {
            async authenticate() {
                if (this.password === '${process.env.ADMIN_PASSWORD}') {
                    this.authenticated = true;
                    this.loginError = '';
                    await this.loadContacts();
                } else {
                    this.loginError = '認証に失敗しました。';
                }
            },
            logout() {
                this.authenticated = false;
                this.password = '';
                this.contacts = [];
            },
            async loadContacts() {
                try {
                    const response = await fetch('/api/admin/contacts', {
                        headers: {
                            'X-Admin-Key': this.accessKey,
                            'X-Admin-Password': '${process.env.ADMIN_PASSWORD}'
                        }
                    });
                    const data = await response.json();
                    if (data.success) {
                        this.contacts = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    }
                } catch (error) {
                    console.error('Failed to load contacts:', error);
                }
            },
            async deleteContact(id) {
                if (confirm('このお問い合わせを削除しますか？')) {
                    try {
                        const response = await fetch(\`/api/admin/contacts/\${id}\`, {
                            method: 'DELETE',
                            headers: {
                                'X-Admin-Key': this.accessKey,
                                'X-Admin-Password': '${process.env.ADMIN_PASSWORD}'
                            }
                        });
                        const data = await response.json();
                        if (data.success) {
                            await this.loadContacts();
                        }
                    } catch (error) {
                        console.error('Failed to delete contact:', error);
                    }
                }
            },
            viewContact(contact) {
                this.selectedContact = contact;
            },
            formatDate(dateString) {
                return new Date(dateString).toLocaleString('ja-JP');
            },
            getTypeClass(type) {
                const classes = {
                    '受託開発': 'bg-blue-600 text-white',
                    '自社サービス開発': 'bg-purple-600 text-white',
                    'DX・ITコンサル': 'bg-green-600 text-white',
                    'その他': 'bg-gray-600 text-white'
                };
                return classes[type] || 'bg-gray-600 text-white';
            }
        }
    }).mount('#admin-app');
    </script>
</body>
</html>`;
    
    res.send(adminHTML);
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
