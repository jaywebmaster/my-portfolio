import { profile, socials } from "@/data/profile";
import { education, skillGroups } from "@/data/resume";
import { getSiteUrl, site } from "@/data/site";

/** schema.org Person + WebSite for the home page, built from the same data the page shows. */
export function StructuredData() {
  const url = getSiteUrl();
  const person = {
    "@type": "Person",
    "@id": `${url}/#person`,
    name: profile.name,
    url,
    image: `${url}${profile.photo.src}`,
    jobTitle: profile.titles[0],
    description: site.intro,
    email: `mailto:${profile.email}`,
    telephone: profile.phone.href.replace("tel:", ""),
    address: { "@type": "PostalAddress", addressCountry: "PH" },
    sameAs: socials.map((s) => s.href),
    knowsAbout: [...new Set(skillGroups.flatMap((g) => g.items))].slice(0, 30),
    alumniOf: education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.school.split(",")[0],
    })),
  };
  const website = {
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: site.name,
    description: site.intro,
    inLanguage: "en",
    publisher: { "@id": `${url}/#person` },
  };
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": [person, website] });

  return (
    <script
      type="application/ld+json"
      // Escape "<" so no string in the data can close the script tag.
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  );
}
