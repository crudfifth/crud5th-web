import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Mail, Phone, Twitter, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

interface ContactForm {
  name: string;
  email: string;
  type: string;
  message: string;
}

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    type: "",
    message: ""
  });

  // EmailJS Configuration
  const EMAILJS_PUBLIC_KEY = 'dU72FW2OraVAQiNy1';
  const EMAILJS_SERVICE_ID = 'service_cek2z0h';
  const EMAILJS_TEMPLATE_ID = 'template_21xzi95';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.type || !formData.message) {
      toast({
        title: "入力エラー",
        description: "すべての項目を入力してください。",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // EmailJSでメール送信
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          type: formData.type,
          message: formData.message,
          sent_date: new Date().toLocaleString('ja-JP')
        },
        EMAILJS_PUBLIC_KEY
      );
      
      toast({
        title: "送信完了",
        description: "お問い合わせを受け付けました。後日担当者よりご連絡いたします。",
      });
      
      // フォームをリセット
      setFormData({
        name: "",
        email: "",
        type: "",
        message: ""
      });
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "送信エラー",
        description: "お問い合わせの送信に失敗しました。時間をおいて再度お試しください。",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
          data-testid="contact-header"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">お問い合わせ</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            プロジェクトのご相談やお見積もりなど、お気軽にお問い合わせください
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              data-testid="contact-info"
            >
              <h3 className="text-2xl font-bold mb-8 text-foreground">直接お問い合わせ</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4" data-testid="contact-email">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="text-foreground font-semibold">crudfifth@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4" data-testid="contact-phone">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">電話</div>
                    <div className="text-foreground font-semibold">090-9423-8717</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="text-lg font-semibold mb-4 text-foreground">ソーシャルリンク</h4>
                <div className="flex space-x-4" data-testid="contact-social">
                  <a 
                    href="https://x.com/CRUD5th" 
                    className="w-12 h-12 bg-secondary border border-border rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                    data-testid="social-twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://github.com/crudfifth" 
                    className="w-12 h-12 bg-secondary border border-border rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                    data-testid="social-github"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              data-testid="contact-form"
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">お名前</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="山田太郎"
                    className="bg-secondary border-border text-foreground"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">メールアドレス</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="example@email.com"
                    className="bg-secondary border-border text-foreground"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">お問い合わせ種別</label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger className="bg-secondary border-border text-foreground" data-testid="select-type">
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="受託開発">受託開発について</SelectItem>
                      <SelectItem value="自社サービス開発">自社サービス開発について</SelectItem>
                      <SelectItem value="DX・ITコンサル">DX・ITコンサルについて</SelectItem>
                      <SelectItem value="その他">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">メッセージ</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={5}
                    placeholder="プロジェクトの詳細やご要望をお聞かせください..."
                    className="bg-secondary border-border text-foreground resize-none"
                    data-testid="textarea-message"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all"
                  data-testid="button-submit"
                >
                  {isLoading ? "送信中..." : "送信する"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
