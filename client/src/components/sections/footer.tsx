import { motion } from "framer-motion";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-secondary/30 border-t border-border py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-0"
            data-testid="footer-brand"
          >
            <div className="text-2xl font-bold gradient-text mb-2">CRUD5th</div>
            <div className="text-muted-foreground">エンジニアチーム</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex space-x-8"
            data-testid="footer-nav"
          >
            {[
              { label: "ホーム", id: "home" },
              { label: "サービス", id: "services" },
              { label: "チーム", id: "team" },
              { label: "お問い合わせ", id: "contact" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid={`footer-link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground"
          data-testid="footer-copyright"
        >
          © 2024 CRUD5th. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}
