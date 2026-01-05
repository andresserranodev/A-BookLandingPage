import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/LanguageContext";

export function useWaitlistForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: t.preorder.successTitle,
      description: t.preorder.successDescription,
    });

    setEmail("");
    setIsSubmitting(false);
  };

  return {
    email,
    setEmail,
    isSubmitting,
    handleSubmit,
  };
}
