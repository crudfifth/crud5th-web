import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Mail, Phone, Twitter, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";
import { AnimatedUnderline } from "@/components/animations/svg-path-animation";
import { z } from "zod";

type ContactFormData = z.infer<typeof insertContactSchema>;

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      type: "受託開発",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "送信完了",
        description: data.message,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "送信失敗",
        description: error.message || "送信に失敗しました。もう一度お試しください。",
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
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
          <h2 className="text-2xl font-bold mb-12 gradient-text relative">
            お問い合わせ
            <AnimatedUnderline className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32" delay={600} />
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
              initial={{ opacity: 0, y: 60 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              data-testid="contact-form"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">お名前</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="山田太郎" 
                            className="bg-background/60 border-muted-foreground/30 text-foreground placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary transition-all" 
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">メールアドレス</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email" 
                            placeholder="example@email.com" 
                            className="bg-background/60 border-muted-foreground/30 text-foreground placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary transition-all"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">お問い合わせ種別</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/60 border-muted-foreground/30 text-foreground hover:border-primary/50 focus:border-primary transition-all" data-testid="select-category">
                              <SelectValue placeholder="選択してください" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="受託開発" data-testid="option-freelance-development">受託開発</SelectItem>
                            <SelectItem value="自社サービス開発" data-testid="option-web-service-development">自社サービス開発</SelectItem>
                            <SelectItem value="DX・ITコンサル" data-testid="option-dx-consulting">DX・ITコンサル</SelectItem>
                            <SelectItem value="その他" data-testid="option-other">その他</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">メッセージ</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={5} 
                            placeholder="プロジェクトの詳細やご要望をお聞かせください..." 
                            className="bg-background/60 border-muted-foreground/30 text-foreground placeholder:text-muted-foreground resize-none hover:border-primary/50 focus:border-primary transition-all min-h-[120px] rounded-md"
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 transition-all py-3 font-medium" 
                    disabled={contactMutation.isPending}
                    data-testid="button-submit"
                  >
                    {contactMutation.isPending ? "送信中..." : "送信する"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
