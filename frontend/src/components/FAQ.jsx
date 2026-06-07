import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS, SOCIALS } from "@/lib/goat-data";

export default function FAQ() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative py-24 md:py-36 px-5 md:px-8 bg-[#070707] border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#10B981]">
            05 · FAQ
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl mt-3 tracking-[-0.03em]">
            Questions, <span className="goat-gradient-text">answered.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, idx) => (
              <AccordionItem
                key={faq.q}
                value={`item-${idx}`}
                data-testid={`faq-accordion-item-${idx}`}
                className="rounded-2xl border border-white/10 bg-[#0a0a0a] px-5 md:px-7 data-[state=open]:border-[#FFD700]/40 transition-colors"
              >
                <AccordionTrigger
                  data-testid={`faq-trigger-${idx}`}
                  className="font-display font-bold text-base md:text-lg text-left py-5 hover:no-underline hover:text-[#FFD700] [&[data-state=open]]:text-[#FFD700]"
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-300 text-sm md:text-base leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-400 text-sm">
            Still have questions? Join the herd on{" "}
            <a
              href={SOCIALS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#10B981] hover:text-[#34D399] underline-offset-4 hover:underline"
            >
              Telegram
            </a>{" "}
            or{" "}
            <a
              href={SOCIALS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFD700] hover:text-[#FBE14D] underline-offset-4 hover:underline"
            >
              X
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
