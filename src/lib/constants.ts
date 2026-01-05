import type { Language } from "./translations";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";

export const SITE_CONFIG = {
  title: "Un Andrés Más",
  email: "andres.david.s117@gmail.com",
  preorderFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSc0GMdu5nHVcQhnMjNuPqcQWUbzWzK_jo-3kJejArSuej0k-A/viewform?usp=dialog",
} as const;

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/andres.david.sv/",
    testId: "link-instagram",
  },
  {
    name: "Facebook",
    icon: FacebookIcon,
    href: "https://www.facebook.com/ads.f117",
    testId: "link-facebook",
  },
] as const;

export const NAV_SECTIONS = [
  { id: "about", translationKey: "aboutBook" as const },
  { id: "author", translationKey: "author" as const },
  { id: "preorder", translationKey: "preorder" as const },
] as const;

export const JOURNEY_STATS: Record<Language, { distance: string }> & {
  countries: number;
} = {
  en: { distance: "15,000" },
  es: { distance: "24,000" },
  countries: 7,
};
