import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import styles from "./privacy-policy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | WBSQ Holdings",
  description: "How WBSQ Holdings collects, uses and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page} id="top">
      <SiteHeader theme="light" />
      <main className={styles.main}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>WBSQ Holdings</p>
          <h1>Privacy Policy</h1>
          <p className={styles.updated}>Last updated: 6 November 2026</p>
        </header>
        <article className={styles.content} aria-label="Privacy Policy">
<p>WBSQ is operated by WBSQ HOLDINGS PTE. LTD. (UEN: 202338361R), a company incorporated in Singapore (“we”, “us”, or “our”).</p>
<p>We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and protect personal data when you visit the WBSQ website, submit an enquiry, contact us, or use our services.</p>
<p>We handle personal data in accordance with the Personal Data Protection Act 2012 of Singapore (PDPA) and other applicable data protection requirements.</p>
<section>
<h2>Information We Collect</h2>
<p>When you interact with us, we may collect information you provide, including your name, email address, telephone number, company name, and any information included in your enquiries, messages, or submitted documents.</p>
<p>When you browse our website, we may also collect technical information such as your IP address, browser type, device information, pages visited, and referring website.</p>
</section>
<section>
<h2>How We Use Your Information</h2>
<p>We use personal data to:</p>
<ul><li>Respond to enquiries and provide customer support.</li><li>Provide information about our services.</li><li>Prepare quotations and manage service requests.</li><li>Communicate with you about ongoing work or arrangements.</li><li>Maintain and improve our website and services.</li><li>Protect our website against misuse, fraud, and security threats.</li><li>Meet applicable legal and regulatory requirements.</li></ul>
<p>Where we have your consent or are otherwise permitted by law, we may send you news, announcements, or promotional communications. You may unsubscribe from marketing communications at any time.</p>
</section>
<section>
<h2>Consent</h2>
<p>Where consent is required, we will obtain it before collecting, using, or disclosing your personal data for the relevant purpose.</p>
<p>When you submit an enquiry or request a service, we will use the information you provide to respond to that enquiry or fulfil that request. If we wish to use your information for another purpose, we will notify you and obtain further consent where required.</p>
<p>If you provide personal data about another person, please ensure you have the necessary authority to share it with us.</p>
</section>
<section>
<h2>Withdrawal of Consent</h2>
<p>You may withdraw your consent by writing to our Privacy Contact at the address in the Contact Us section below.</p>
<p>We will explain any likely consequences of your withdrawal and process your request within a reasonable time, in accordance with applicable law. Depending on the information involved, we may be unable to continue providing certain services.</p>
<p>Withdrawal does not prevent us from retaining or processing information where required or permitted by law.</p>
</section>
<section>
<h2>Sharing Your Information</h2>
<p>We may share personal data where reasonably necessary with:</p>
<ul><li>Service providers supporting our website, hosting, communications, and business operations.</li><li>Professional advisers, including accountants, auditors, and legal advisers.</li><li>Authorities or regulators where disclosure is required or authorised by law.</li></ul>
<p>Where service providers process personal data on our behalf, we require appropriate protection and limit their use of the information to the services they provide to us.</p>
</section>
<section>
<h2>Third-Party Services and Links</h2>
<p>Our website may contain links to external websites or use third-party services, such as contact platforms, embedded content, or social media features.</p>
<p>When you interact with these services, their own privacy policies may apply. Please review those policies before providing personal data. We do not control the privacy practices of external websites or platforms.</p>
</section>
<section>
<h2>Cookies and Similar Technologies</h2>
<p>Our website may use cookies and similar technologies to support website functionality, remember preferences, and understand how visitors use the website.</p>
<p>Where required by law, we will obtain consent before using non-essential cookies or similar tracking technologies.</p>
<p>You can manage cookies through your browser settings and, where available, our website’s cookie settings. Disabling certain cookies may affect website functionality.</p>
</section>
<section>
<h2>Security</h2>
<p>We take reasonable organisational and technical measures to protect personal data against unauthorised access, use, disclosure, alteration, and loss.</p>
<p>However, no method of internet transmission or electronic storage is completely secure.</p>
</section>
<section>
<h2>Retention of Personal Data</h2>
<p>We retain personal data for as long as necessary to fulfil the purposes for which it was collected, or to meet applicable legal and legitimate business requirements.</p>
<p>When the information is no longer needed, we will take reasonable steps to delete it, anonymise it, or securely dispose of it.</p>
</section>
<section>
<h2>Overseas Transfers</h2>
<p>Some service providers may store or process personal data outside the country where you are located.</p>
<p>Where personal data is transferred overseas, we will take appropriate steps to ensure that it receives protection consistent with applicable data protection requirements.</p>
</section>
<section>
<h2>Access and Correction</h2>
<p>You may contact us to request access to your personal data or correction of inaccurate or incomplete information, subject to applicable law.</p>
<p>We may need to verify your identity before processing a request. If we cannot fulfil a request, we will explain why where required by law.</p>
<p>Please send requests to our Privacy Contact at the address in the Contact Us section below.</p>
</section>
<section>
<h2>Changes to This Privacy Policy</h2>
<p>We may update this Privacy Policy to reflect changes to our services, practices, or applicable requirements.</p>
<p>The updated version will be published on this page with a revised “Last updated” date. Where required, we will notify you of material changes and obtain any necessary consent.</p>
</section>
<section>
<h2>Contact Us</h2>
<p>For questions, requests, or complaints concerning this Privacy Policy or our handling of your personal data, please contact:</p>
<p>WBSQ - WBSQ HOLDINGS PTE. LTD.<br />Privacy Contact / Data Protection Officer</p>
</section>
        </article>
      </main>
      <SiteFooter active="privacy-policy" />
    </div>
  );
}
