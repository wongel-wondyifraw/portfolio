"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Send, Copy, Check, Globe, Phone, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { portfolioData } from "@/data/portfolio-data";
import { useClipboard } from "@/hooks/use-clipboard";
import { useAudio } from "@/components/providers/audio-provider";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const { copied, copy } = useClipboard();
  const { playClick, playSuccess } = useAudio();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const linkedinUrl =
    portfolioData.socials.find((s) => s.icon === "linkedin")?.url ||
    "https://linkedin.com/in/wongel-kassa";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Failed to dispatch message.");
      }

      playSuccess();
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore
      }

      toast.success("Message dispatched!", {
        description: `Thank you ${data.name}. Your inquiry was sent to Telegram, and I will get back to you shortly at ${data.email}.`,
      });

      reset();
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to deliver message.";
      toast.error("Message could not be sent", {
        description: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 space-y-6">
      {/* Section Header */}
      <div className="pb-3 border-b border-border/50">
        <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block mb-1">
          06 // Contact &amp; Connect
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-sans">
          Let&apos;s Build Together.
        </h2>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed text-justify">
          Available for product ownership roles, system architecture consulting, or technical advisory.
        </p>
      </div>

      {/* 2-Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
        {/* Direct Channels */}
        <Card className="p-5 rounded-2xl border border-border/70 bg-card shadow-2xs space-y-3.5">
          <h3 className="text-sm font-bold text-foreground">Direct Channels</h3>
          
          <div className="space-y-2.5 text-xs font-mono">
            {/* Email */}
            <div className="p-2.5 rounded-xl bg-muted/40 border border-border/50 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 truncate">
                <Mail className="size-3.5 text-primary shrink-0" />
                <span className="truncate text-foreground">{portfolioData.personal.email}</span>
              </div>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => {
                  playClick();
                  copy(portfolioData.personal.email, "Email copied!");
                }}
                className="cursor-pointer shrink-0"
                aria-label="Copy email"
              >
                {copied ? (
                  <Check className="size-3 text-emerald-500" />
                ) : (
                  <Copy className="size-3 text-muted-foreground" />
                )}
              </Button>
            </div>

            {/* Phone */}
            {portfolioData.personal.phone && (
              <div className="p-2.5 rounded-xl bg-muted/40 border border-border/50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 truncate">
                  <Phone className="size-3.5 text-primary shrink-0" />
                  <span className="truncate text-foreground">{portfolioData.personal.phone}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => {
                    playClick();
                    copy(portfolioData.personal.phone || "", "Phone copied!");
                  }}
                  className="cursor-pointer shrink-0"
                  aria-label="Copy phone"
                >
                  <Phone className="size-3 text-muted-foreground" />
                </Button>
              </div>
            )}

            {/* LinkedIn */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-muted/40 border border-border/50 flex items-center justify-between gap-2 text-foreground hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2">
                <Icons.linkedIn className="size-3.5 text-primary" />
                <span>linkedin.com/in/wongel-kassa</span>
              </div>
              <ExternalLink className="size-3 text-muted-foreground" />
            </a>

            {/* Location */}
            <div className="pt-1.5 text-muted-foreground flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1">
                <Globe className="size-3 text-primary" />
                {portfolioData.personal.location}
              </span>
              <span>{portfolioData.personal.timezone}</span>
            </div>
          </div>
        </Card>

        {/* Message Form */}
        <Card className="p-5 rounded-2xl border border-border/70 bg-card shadow-2xs">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="text-[11px] font-mono text-muted-foreground block mb-1">
                NAME
              </label>
              <Input
                {...register("name")}
                placeholder="Your Name"
                className="bg-background h-8 text-xs"
              />
              {errors.name && (
                <p className="text-[10px] text-destructive mt-0.5 font-mono">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-[11px] font-mono text-muted-foreground block mb-1">
                EMAIL
              </label>
              <Input
                {...register("email")}
                type="email"
                placeholder="you@company.com"
                className="bg-background h-8 text-xs"
              />
              {errors.email && (
                <p className="text-[10px] text-destructive mt-0.5 font-mono">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-[11px] font-mono text-muted-foreground block mb-1">
                MESSAGE
              </label>
              <Textarea
                {...register("message")}
                rows={3}
                placeholder="Tell me about your product requirements, initiative, or role..."
                className="bg-background resize-none text-xs"
              />
              {errors.message && (
                <p className="text-[10px] text-destructive mt-0.5 font-mono">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl cursor-pointer bg-primary text-primary-foreground hover:opacity-90 font-medium h-8 text-xs"
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Send className="size-3" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
