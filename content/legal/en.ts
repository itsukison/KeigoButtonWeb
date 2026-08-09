import type { LegalDocument } from "@/components/LegalDoc";

/**
 * Reference translations of the Japanese originals in `app/{support,terms,privacy}`.
 *
 * They follow the Japanese section by section and number by number, so a reader
 * comparing the two can find the same clause in both. Where a term is a Japanese
 * legal one with no English equivalent — 特定商取引法, 消費者契約法 — the Japanese is
 * kept and glossed rather than replaced with a near-miss.
 */

const PREVAILS =
  "This is a reference translation. The Japanese version is the authoritative text; if the two differ, the Japanese governs.";

export const support: LegalDocument = {
  title: "Support",
  metaDescription:
    "Setting up KeigoButton, using it, troubleshooting, and how to get in touch.",
  updatedAt: "Last updated: 8 June 2026",
  lead: "How to set up KeigoButton, how to use it, what to try when something goes wrong, and where to reach us. If your question is not covered here, please contact us.",
  prevails: PREVAILS,
  blocks: [
    { h2: "Before you start: how KeigoButton works" },
    {
      p: "KeigoButton is an iOS keyboard app for writing Japanese. Ordinary typing stays on your device. Text is only sent to a server when you tap one of the AI buttons. It is not an app that records everything you type.",
    },
    { p: "The Privacy Policy has the detail." },

    { h2: "1. First-time setup" },
    { h3: "1.1 Add the keyboard" },
    {
      ol: [
        "Install KeigoButton from the App Store.",
        "Open the iOS Settings app.",
        "Go to General → Keyboard → Keyboards.",
        "Tap “Add New Keyboard…”.",
        "Choose KeigoButton from the list.",
      ],
    },
    { h3: "1.2 Allow Full Access" },
    {
      ol: [
        "In the same Keyboards screen, tap the KeigoButton entry you just added.",
        "Turn on “Allow Full Access”.",
        "Tap “Allow” when iOS asks you to confirm.",
      ],
    },
    {
      p: "Full Access is used only so the AI features can reach the internet. It is not used to collect everything you type.",
    },
    { h3: "1.3 Switch to the keyboard" },
    {
      p: "In any app where you can type, press and hold the globe key (🌐) at the bottom left of the keyboard and choose KeigoButton.",
    },

    { h2: "2. Using the AI features" },
    { h3: "2.1 Sign in" },
    {
      ol: [
        "Open the KeigoButton app itself (the container app).",
        "Follow the on-screen steps to sign in with your email address.",
        "Once you are signed in, the AI features on the keyboard become available.",
      ],
    },

    { h2: "3. Plans and billing" },
    {
      p: "The iOS keyboard is free and has no subscription. To cancel a paid plan on the Mac app, open the billing management page from the Account screen in the Mac app and cancel there. After cancelling you keep access until the end of the period you have already paid for.",
    },

    { h2: "4. Troubleshooting" },
    { h3: "It does not appear in the keyboard list" },
    {
      ul: [
        "Open the app once and follow the on-screen steps.",
        "Add it again from Settings → General → Keyboard → Keyboards → Add New Keyboard…",
        "Restart iOS and try again.",
      ],
    },
    { h3: "Nothing happens when I press an AI button" },
    {
      ul: [
        "Check that Full Access is turned on.",
        "Check that you are signed in from the app itself.",
        "Check your internet connection.",
        "Switch to another keyboard and back to KeigoButton.",
        "Update the app to the latest version.",
      ],
    },
    { h3: "No suggestions, or the suggestions look wrong" },
    {
      ul: [
        "Suggestions can take a moment to appear while you are still typing.",
        "Very long passages may not convert well. Try one short paragraph at a time.",
        "Feedback that helps us improve is always welcome — please contact us.",
      ],
    },
    { h3: "The keyboard is slow or quits" },
    {
      ul: [
        "iOS keyboard extensions have a tight memory limit, so they can occasionally become unstable.",
        "Restarting the device often clears it.",
        "If it continues, tell us what you were doing, your device name, iOS version and app version.",
      ],
    },
    { h3: "I cannot sign in" },
    {
      ul: [
        "Check the email address for typos.",
        "Check whether the verification email landed in your spam folder.",
        "A VPN or similar network setting can prevent authentication.",
      ],
    },

    { h2: "5. Things worth knowing" },
    {
      ul: [
        "AI-generated text is produced mechanically and can contain mistakes or inappropriate wording. Always read it before using it anywhere that matters.",
        "Please avoid putting more personal data, confidential information, trade secrets or unreleased material into the AI features than you need to.",
        "The app is built for writing Japanese. Other languages may not behave as intended.",
      ],
    },

    { h2: "6. Contact" },
    {
      p: "For questions, bug reports, feature requests or data-deletion requests, please get in touch.",
    },
    { p: "Including as much of the following as you can makes it much faster to look into:" },
    {
      ul: [
        "Device name (for example, iPhone 15 Pro)",
        "iOS version",
        "App version",
        "What is happening",
        "How to reproduce it, as far as you can tell",
        "A screenshot, if you have one",
      ],
    },
    { p: "Company: Core7, Inc. — Contact: Yihuan Sun — Email: keigobutton@gmail.com" },
    {
      p: "We normally reply within two to three business days. Thank you for your patience if a question takes us longer.",
    },
  ],
};

export const terms: LegalDocument = {
  title: "Terms of Service",
  metaDescription: "The terms on which KeigoButton may be used.",
  updatedAt: "Last updated: 8 June 2026",
  lead: "These Terms of Service (the “Terms”) set out the conditions on which Core7, Inc. (“we”, “us”) provides the iOS keyboard app KeigoButton (the “App”). Users of the App (“you”) use it on the basis that you agree to these Terms.",
  prevails: PREVAILS,
  blocks: [
    { h2: "Article 1 (Application)" },
    {
      ol: [
        "These Terms apply to every aspect of the relationship between you and us concerning your use of the App.",
        "Any rules, guidelines, notices or additional terms that we publish in the App from time to time form part of these Terms.",
        "Where these Terms and such rules differ, the rules prevail unless stated otherwise.",
      ],
    },

    { h2: "Article 2 (Definitions)" },
    {
      ol: [
        "“App” means the iOS keyboard app KeigoButton provided by us, together with all associated services.",
        "“AI features” means the features of the App that, when you explicitly operate them, convert text you have entered into polite Japanese (敬語), email text, translations, summaries, rephrasings and similar.",
        "“Content” means text, images, audio, video, programs, data and other information.",
        "“Input Content” means text you send for the purposes of the AI features.",
        "“Generated Content” means text produced by the AI features.",
      ],
    },

    { h2: "Article 3 (What the App is)" },
    {
      ol: [
        "The App provides an iOS keyboard for writing Japanese, together with AI text-conversion features that run when you explicitly operate them.",
        "The scope, type, performance, output and response time of the AI features may change without notice, depending on the state of the App and of external AI providers.",
        "The App does not send every keystroke you make to our servers. Text is sent to our servers only when you explicitly run an AI feature.",
      ],
    },

    { h2: "Article 4 (Requirements)" },
    {
      ol: [
        "You are responsible for providing, at your own cost, the device, OS, network connection, Apple ID and anything else needed to use the App.",
        "To use the AI features you must enable iOS “Full Access”. If Full Access is off, the AI features are unavailable.",
        "We test the App on the iOS versions we specify. We do not warrant behaviour on other versions.",
      ],
    },

    { h2: "Article 5 (Accounts and authentication)" },
    {
      ol: [
        "To use the AI features you must register an account and sign in by the method we specify.",
        "You are responsible for managing your credentials, and must not transfer, lend or disclose them to anyone else.",
        "Anything done through your account is treated as done by the account holder. We are not liable for loss arising from that, whether to us or to you.",
      ],
    },

    { h2: "Article 6 (Fees)" },
    {
      ol: [
        "The iOS keyboard app is free in full. There are no in-app purchases and no paid plan.",
        "The Mac app offers a free plan and a paid subscription. Prices, billing cycle and what is included are as shown on the purchase screen in the Mac app and in the 特定商取引法 disclosure (the statutory disclosure required of sellers in Japan). Payment is processed by Stripe, Inc.",
        "Cancel a paid plan from the billing management page (the Stripe customer portal) opened from the Account screen in the Mac app. After cancelling, access continues to the end of the billing period. Amounts already paid are not generally refunded.",
      ],
    },

    { h2: "Article 7 (About the AI features)" },
    {
      ol: [
        "Generated Content is produced automatically by machine learning. We do not warrant that it is accurate, appropriate, current or useful, or that it does not infringe the rights of others.",
        "It is your decision and your responsibility whether to use Generated Content as it is, or to check and edit it first.",
        "Please try not to include in Input Content any personal data of others, confidential information, trade secrets, unreleased information, credentials or payment details.",
        "We use external AI model providers and cloud providers to deliver the AI features, and Input Content may be sent to them. The Privacy Policy has the detail.",
        "We may limit how often, how frequently and on how much text the AI features may be used, in order to prevent misuse or abuse.",
      ],
    },

    { h2: "Article 8 (Generated Content)" },
    {
      ol: [
        "You warrant that you hold the necessary rights in the Input Content you submit, or are otherwise lawfully entitled to use it.",
        "You may freely use Generated Content for personal or business purposes. We do not warrant that Generated Content does not infringe the rights of others.",
        "You accept that identical or similar Generated Content may also be produced for other users.",
      ],
    },

    { h2: "Article 9 (Prohibited conduct)" },
    { p: "You must not do any of the following when using the App:" },
    {
      ul: [
        "Anything unlawful or contrary to public order and morals",
        "Anything connected with criminal activity",
        "Infringing the intellectual property, likeness, privacy, reputation or other rights or interests of us, other users or third parties",
        "Anything likely to interfere with the operation of the App",
        "Reverse engineering, decompiling, disassembling or otherwise analysing the App",
        "Improperly obtaining, copying, altering or redistributing the App's source code, APIs, credentials or tokens",
        "Calling the AI features in bulk by automated means, scripts or bots",
        "Circumventing, or attempting to circumvent, usage limits",
        "Generating, or attempting to generate, unlawful, harmful, discriminatory, violent, obscene or hateful content through the AI features",
        "Using the AI features to impersonate someone, or to produce text intended to mislead others about who wrote it",
        "Entering other people's personal data or confidential information into the AI features without authority",
        "Using the App to develop a competing service or to collect training data",
        "Anything else we consider inappropriate",
      ],
    },

    { h2: "Article 10 (Suspension and interruption)" },
    {
      ol: [
        "We may suspend or interrupt all or part of the App without notice if: we are carrying out maintenance or an update; force majeure such as earthquake, fire, power failure or natural disaster makes provision difficult; a network, computer or external AI service fails; or we otherwise consider suspension necessary.",
        "We are not liable for any loss suffered by you or a third party as a result of such suspension or interruption.",
      ],
    },

    { h2: "Article 11 (Restriction and removal)" },
    {
      p: "If we consider that you have breached any provision of these Terms, or where we otherwise consider it necessary, we may without notice restrict your use of all or part of the App, or delete your account.",
    },

    { h2: "Article 12 (Disclaimer)" },
    {
      ol: [
        "We do not warrant, expressly or by implication, that the App is free of defects in fact or in law — including defects, errors, bugs or infringements relating to safety, reliability, accuracy, completeness, effectiveness, fitness for a particular purpose or security.",
        "Except where we have acted intentionally or with gross negligence, we are not liable for any loss arising from your use of, or inability to use, the App.",
        "Even where we are liable, our liability is limited to direct and ordinary loss actually suffered by you. We are not liable for special loss, lost profits or indirect loss.",
        "Where the 消費者契約法 (Consumer Contract Act) or another mandatory provision of law means the paragraph above does not apply, our liability is capped at the total amount you have paid us directly in respect of the App.",
        "We are not liable for the consequences of using the AI features for business, contractual, legal, medical, financial or other significant decisions.",
      ],
    },

    { h2: "Article 13 (Changes and discontinuation)" },
    {
      p: "We may change what the App does, or stop providing it, without notifying you. We are not liable for any loss you suffer as a result.",
    },

    { h2: "Article 14 (Changes to these Terms)" },
    {
      ol: [
        "We may change these Terms at any time without notifying you, where we consider it necessary.",
        "If you use the App after a change, you are treated as having agreed to the changed Terms.",
        "Where a change is significant, we will notify you in the App, on our website or by another appropriate means.",
      ],
    },

    { h2: "Article 15 (Personal data)" },
    {
      p: "We handle personal data obtained in connection with your use of the App in accordance with our separate Privacy Policy.",
    },

    { h2: "Article 16 (Notices)" },
    {
      p: "Notices between you and us are given by the means we specify. Unless you have notified us of a change in the manner we specify, we treat the contact details currently registered as valid and send notices there.",
    },

    { h2: "Article 17 (No assignment)" },
    {
      p: "You may not assign or pledge your position under these Terms, or any right or obligation arising under them, to a third party without our prior written consent.",
    },

    { h2: "Article 18 (Severability)" },
    {
      p: "If any provision of these Terms, or part of one, is held invalid or unenforceable under the 消費者契約法 or other law, the remaining provisions, and the remainder of the provision partly held invalid or unenforceable, remain in full effect.",
    },

    { h2: "Article 19 (Governing law and jurisdiction)" },
    {
      ol: [
        "These Terms are governed by and construed in accordance with the laws of Japan.",
        "Any dispute concerning the App is subject to the exclusive jurisdiction of the court having jurisdiction over the location of our head office.",
      ],
    },

    { h2: "Article 20 (Contact)" },
    { p: "For questions about these Terms, please contact us." },
    { p: "Company: Core7, Inc. — Representative: Yihuan Sun — Email: keigobutton@gmail.com" },
  ],
};

export const privacy: LegalDocument = {
  title: "Privacy Policy",
  metaDescription: "How KeigoButton handles user information.",
  updatedAt: "Last updated: 2 July 2026 (consent version: 2026-07-02)",
  lead: "Core7, Inc. (“we”, “us”) sets out below its Privacy Policy (this “Policy”) governing how user information is handled in the iOS keyboard app KeigoButton (the “App”).",
  prevails: PREVAILS,
  blocks: [
    {
      p: "The App converts text you have written into polite Japanese (敬語), business writing, email text, translations, rephrasings and similar. We are very aware that, because this is a keyboard app, what you type can include personal and confidential information, and we handle only the minimum necessary, for clearly stated purposes.",
    },
    {
      p: "We aim to explain things transparently, to manage data safely, and not to collect what we do not need.",
    },

    { h2: "1. Principles" },
    { p: "In providing the App we hold to the following:" },
    {
      ol: [
        "We process only the text you explicitly send through an AI feature. The App processes text you send by tapping an AI feature such as 敬語, email, translation or rephrasing.",
        "We do not continuously record everything you type. The App does not collect or store all of your keyboard input, all of your keystrokes, or all of your conversations.",
        "We do not set out to collect passwords, card numbers, verification codes or similar. iOS may switch to the standard keyboard in secure fields such as password fields, and in any case we do not intend to obtain such information.",
        "We send the text you submit to third-party AI services to the extent needed for conversion. Producing an AI conversion requires sending the text you selected and submitted to the third-party AI services that generate it (Cerebras and Groq). We explain what is sent, to whom, and why, on a consent screen in the App, and enable the AI features only where you have explicitly agreed (see section 6).",
        "We store data for AI improvement only if you opt in. We may store and use conversion-related data, after masking, to improve the quality of Japanese AI and to build evaluation datasets and benchmarks, including provision to third parties. This happens only where you have explicitly opted in within the App; it is off by default, and you can withdraw consent at any time (see section 7).",
      ],
    },

    { h2: "2. Information we collect" },
    { p: "We may collect the following, to the extent needed to provide the App." },
    { h3: "2.1 Text you send to the AI features" },
    { p: "Where you use AI features such as the following, we process the text you send:" },
    {
      ul: [
        "Conversion to 敬語",
        "Writing email text",
        "Translation",
        "Rephrasing",
        "Shortening and summarising",
        "Adjusting tone",
        "Any other AI text conversion offered in the App",
      ],
    },
    { p: "What may be collected and processed includes:" },
    {
      ul: [
        "The original text you sent for conversion",
        "The candidates the AI generated",
        "The candidate you chose",
        "Which feature was used",
        "The number of characters or tokens in and out",
        "The time of processing",
        "Error information",
      ],
    },
    {
      p: "The App does not continuously collect what you type when you are not using an AI feature.",
    },
    {
      p: "Of this information, what is retained after the conversion has been produced, and used for AI improvement and evaluation, is limited to cases where you have explicitly opted in under section 7. Without that consent we do not retain the submitted text or the candidates for that purpose, and keep only statistical and technical metadata (section 2.3).",
    },
    { h3: "2.2 Account information" },
    {
      p: "Using the App's AI features may require signing in. In connection with signing in we collect:",
    },
    {
      ul: [
        "Email address",
        "Authentication tokens (access and refresh tokens)",
        "Sign-in times",
        "The device and OS used to sign in",
      ],
    },
    { h3: "2.3 Usage information" },
    {
      p: "To improve the App, keep it running reliably and understand how it is used, we may collect:",
    },
    {
      ul: [
        "App launches",
        "Use of keyboard features",
        "How often each button and feature is used",
        "Whether AI conversions succeeded or failed",
        "Errors",
        "Crash logs",
        "App version",
        "OS version",
        "Device type",
        "Language setting",
        "Approximate times of use",
        "An anonymous or pseudonymous user identifier",
      ],
    },
    {
      p: "This is used to improve the service, respond to faults, raise quality and analyse usage trends.",
    },
    { h3: "2.4 Enquiries" },
    { p: "If you contact us, we may collect:" },
    {
      ul: [
        "Your name or display name",
        "Email address",
        "The content of your enquiry",
        "Technical information such as device, OS and app version",
        "Any screenshots, attachments or further information you choose to provide",
      ],
    },
    { h3: "2.5 Billing" },
    {
      p: "The iOS keyboard app is free and there is no billing. For paid plans in the Mac app, payment is processed through Stripe, Inc.",
    },
    {
      p: "We do not obtain or store card numbers or other payment credentials directly. We may obtain purchase status, whether a subscription is active, the plan purchased, purchase date, expiry and payment-related identifiers.",
    },

    { h2: "3. What we do not collect" },
    { p: "We do not set out to collect any of the following in the App:" },
    {
      ul: [
        "Every keystroke you type",
        "Text you have not sent to an AI feature",
        "Passwords",
        "Card numbers",
        "Bank account details",
        "Verification codes",
        "My Number (Japanese individual number)",
        "Precise location",
        "Your contacts",
        "Your whole photo library",
        "Information inside other apps",
        "The content of calls",
        "Tracking information for advertising",
      ],
    },
    {
      p: "That said, if the text you send to an AI feature contains names, phone numbers, email addresses, addresses, company names or other personal or confidential information, that information may be processed as part of the text. Please take care not to enter more sensitive information than you need to.",
    },

    { h2: "4. About Full Access" },
    {
      p: "iOS custom keyboards may require “Full Access” in order to offer features that use the internet.",
    },
    {
      p: "The App sends text you have explicitly submitted to the third-party AI services named in section 6 (Cerebras and Groq) in order to provide conversion, translation, email writing and rephrasing. Full Access is therefore required for the AI features.",
    },
    {
      p: "Even with Full Access enabled, we do not continuously collect everything you type. In principle we process only the text you explicitly submit for an AI feature, and the technical information needed to run the App.",
    },
    {
      p: "You can disable Full Access at any time from iOS Settings. With it disabled, the AI features are unavailable.",
    },

    { h2: "5. Why we use information" },
    { p: "We use the information we collect in order to:" },
    {
      ol: [
        "Provide, maintain and improve the App",
        "Perform AI conversion, translation, rephrasing, email writing and similar",
        "Offer you several candidate texts",
        "Analyse how the App is used and improve it",
        "Investigate and respond to defects, faults, errors and crashes",
        "Detect and prevent misuse, spam, abuse and security problems",
        "Answer enquiries, verify identity and provide support",
        "Check paid features, subscriptions and purchase status",
        "Improve AI models, prompts, conversion quality and the interface",
        "Respond to conduct breaching the Terms, this Policy or the law",
        "Respond to requirements of law, guidelines, and government or judicial authorities",
        "Any purpose you have consented to",
      ],
    },

    { h2: "6. AI processing and transfer to third-party AI services" },
    {
      p: "When you run an AI conversion (敬語, email, translation, rephrasing and so on), we send the following to third-party AI service providers in order to generate the result:",
    },
    {
      ul: [
        "The text you submitted for conversion",
        "Which feature was used (敬語, email, translation and so on)",
        "Technical information about the processing (characters in and out, time, error information)",
      ],
    },
    {
      p: "This is sent only when you tap an AI conversion button. Ordinary typing and keystrokes are never sent to the AI services automatically.",
    },
    {
      p: "On first use, the App shows a consent screen explaining what is sent, to whom and why, and enables the AI conversion features only where you explicitly agree. You can withdraw that consent at any time from the App's settings.",
    },
    { p: "The third-party AI services we use for conversion are:" },
    {
      ul: [
        "Cerebras (Cerebras Systems, Inc.) — receives the text you submitted and the data above, and generates the conversion using an AI model. See cloud.cerebras.ai/privacy",
        "Groq (Groq, Inc.) — generates conversions in the same way, as a fallback when Cerebras is unavailable. See groq.com/privacy-policy",
      ],
    },
    { p: "We also use the following providers to operate the App:" },
    {
      ul: [
        "Supabase (Supabase, Inc.) — cloud infrastructure for sign-in, data storage and relaying requests to the AI services. Text you submit passes through Supabase infrastructure on its way to the AI services. See supabase.com/privacy",
        "PostHog (PostHog, Inc.) — analysis of app usage and faults. The content of text submitted for AI conversion is not sent to PostHog. See posthog.com/privacy",
      ],
    },
    {
      p: "We have confirmed that each of these third parties publishes its own privacy policy and that they provide data protection at least equivalent to this Policy. If we change the third parties we use, we will update this Policy and notify users of significant changes.",
    },

    { h2: "7. Consent to data use for AI improvement (opt-in)" },
    {
      p: "To evaluate and improve the quality of the App's AI conversion, and to build evaluation datasets and benchmarks for Japanese writing, we may store and analyse the text you send to the AI features, the candidates generated, the candidate you selected, and which feature was used. That analysis is carried out in order to:",
    },
    {
      ul: [
        "Produce more natural 敬語",
        "Improve the quality of business writing, email text, translations and rephrasings",
        "Reduce unnatural, inaccurate or inappropriate output",
        "Improve features around the expressions and situations people actually use",
        "Improve response speed, stability and cost efficiency",
        "Support evaluation and research on Japanese writing, and build benchmarks and evaluation datasets",
      ],
    },
    {
      p: "Storage and use for these purposes, including provision to third parties, happens only where you have explicitly opted in within the App. By default, nothing is stored for AI improvement. Without that consent, once the conversion has been produced we do not retain the text or the candidates for that purpose, and keep only statistical and technical metadata (which feature, character counts, time of processing, response time).",
    },
    { h3: "7.1 Scope of data use" },
    {
      p: "Data use for AI improvement happens only where you explicitly opt in. It is off by default. Where you do consent, the scope covers:",
    },
    {
      ul: [
        "Not used (default): nothing is stored for AI improvement.",
        "Research and benchmarks: data is used for evaluation and research on Japanese writing, and to build benchmarks and evaluation datasets.",
        "Creating and providing commercial datasets: includes creating anonymised and processed data as evaluation or training datasets and providing them to third parties (section 8). This improves the quality of Japanese AI and may in future improve the App's own accuracy.",
      ],
    },
    {
      p: "These uses take effect only where you have given separate, explicit consent within the App. Every feature of the App remains available if you do not consent.",
    },
    { h3: "7.2 Masking of personal data before storage" },
    {
      p: "Where text is stored for AI improvement, we apply automatic masking beforehand, seeking to remove information that could identify an individual — names, email addresses, phone numbers, addresses, URLs, identifiers and account numbers, and strings resembling verification codes or passwords.",
    },
    {
      p: "That masking is an automated best effort and is not a guarantee that all personal or confidential information is removed. The unmasked original is stored only where you have separately allowed it in the settings screen; without that permission, the original is not stored.",
    },
    { h3: "7.3 Pseudonymisation" },
    {
      p: "Data stored for AI improvement is held against a pseudonymous identifier derived in a way that is hard to reverse, not against your actual account identifier. Datasets provided to third parties do not contain actual account identifiers.",
    },
    { h3: "7.4 Withdrawing consent" },
    {
      p: "You can withdraw this consent at any time from the App's settings screen. After withdrawal, later data is no longer stored for AI improvement. Data already anonymised, aggregated or provided to a third party before withdrawal may not be deletable against a particular user.",
    },
    {
      p: "Data stored for AI improvement may contain personal or confidential information present in the text you sent. Please take care not to enter other people's personal data, confidential information, trade secrets, unreleased information or other sensitive material beyond what you need to.",
    },

    { h2: "8. Provision of personal data to third parties" },
    { p: "We do not provide your personal data to third parties except:" },
    {
      ol: [
        "With your consent",
        "To subcontractors, to the extent needed to provide the App",
        "Where required by law",
        "Where necessary to protect a person's life, body or property and consent is difficult to obtain",
        "Where particularly necessary for public health or the sound upbringing of children and consent is difficult to obtain",
        "Where cooperation is needed for a national or local government body, or a party commissioned by one, to carry out statutory duties, and obtaining consent would impede those duties",
        "Where information is transferred to the extent necessary as part of a business transfer, merger, company split, share transfer or other reorganisation or succession",
      ],
    },
    {
      p: "Where you have consented to “creating and providing commercial datasets” under section 7.1 and we provide that data to a third party, what is provided is limited to a form that cannot directly identify a particular individual, having been through the masking in section 7.2 and the pseudonymisation in section 7.3. Before any such provision we explain the purpose and the type of recipient, in the App or in this Policy. Data belonging to users who have not given that consent is not provided to third parties for this purpose.",
    },

    { h2: "9. Subcontracting" },
    {
      p: "We may subcontract all or part of the handling of the information we collect, to the extent needed to provide, operate, improve and support the App. Where we do, we supervise the subcontractor appropriately.",
    },

    { h2: "10. Transfers to third parties outside Japan" },
    {
      p: "The AI processing infrastructure, cloud services, analytics services and fault-monitoring services we use may be provided by companies located outside Japan.",
    },
    {
      p: "In that case, text you send to the AI features, usage information and technical information may be sent to, stored on or processed by servers or companies outside Japan. Where we provide personal data to a third party outside Japan, we take the measures required by applicable law.",
    },

    { h2: "11. Retention" },
    { p: "We keep information only for as long as needed for the purpose it was collected for." },
    {
      table: {
        head: ["Type of information", "Indicative retention"],
        rows: [
          [
            "Text sent for AI conversion (only where you opted in to storage for AI improvement)",
            "Masked, for as long as needed for improvement and evaluation",
          ],
          ["AI conversion results (same)", "Masked, for as long as needed for improvement and evaluation"],
          [
            "Text and results where you have not opted in",
            "Not stored for that purpose (statistical and technical metadata only)",
          ],
          ["Anonymised or aggregated usage data", "May be kept without a fixed period"],
          ["Usage data", "Around 24 months at most"],
          ["Crash and error logs", "Around 12 months at most"],
          ["Enquiries", "A reasonable period after the matter is closed"],
          ["Billing and purchase status", "As required by contract and by law"],
        ],
      },
    },
    {
      p: "Information that is no longer needed is deleted, anonymised or aggregated by reasonable means.",
    },

    { h2: "12. Anonymised and aggregated information" },
    {
      p: "We may create anonymised, statistical or aggregated information from what we collect, processed so that no individual can be identified.",
    },

    { h2: "13. Advertising and tracking" },
    {
      p: "We do not currently plan to run behaviourally targeted advertising through third-party ad networks in the App.",
    },
    {
      p: "We do not use information to track you across other companies' apps and websites without your permission.",
    },
    {
      p: "If we introduce advertising, ad measurement or tracking in future, we will follow applicable law, App Store rules and Apple's App Tracking Transparency, and obtain consent where required.",
    },

    { h2: "14. Security" },
    {
      p: "We take reasonable measures to prevent leakage, loss, damage, unauthorised access and misuse of the information we collect:",
    },
    {
      ul: [
        "Encryption in transit (HTTPS / TLS)",
        "Access control",
        "Appropriate handling of credentials",
        "Log management",
        "Measures against unauthorised access",
        "Appropriate selection and management of subcontractors",
        "Deletion or anonymisation of information no longer needed",
        "Investigation and response where a security problem occurs",
      ],
    },
    {
      p: "That said, because the App uses internet communication, cloud services and AI processing infrastructure, complete security cannot be guaranteed.",
    },

    { h2: "15. Your choices" },
    { p: "You can control how your information is handled, within limits, by:" },
    {
      ul: [
        "Disabling Full Access from iOS Settings",
        "Removing the keyboard from iOS Settings",
        "Deleting the App from your device",
        "Choosing not to use the AI features",
        "Withdrawing consent to data use for AI improvement, from the App's settings",
        "Contacting us to ask about deletion of your data",
      ],
    },

    { h2: "16. Children" },
    {
      p: "Where a minor uses the App, we ask that they do so with the consent of a parent or guardian.",
    },

    { h2: "17. Compliance" },
    {
      p: "We handle personal data in accordance with the 個人情報保護法 (Act on the Protection of Personal Information) and other applicable law and guidelines.",
    },

    { h2: "18. Changes to this Policy" },
    {
      p: "We may change this Policy as needed. Where a change is significant, we will notify you in the App, on our website or by another appropriate means.",
    },

    { h2: "19. A note specific to keyboard apps" },
    {
      p: "Because this is a keyboard app, we think it is worth saying plainly: the App does not send what you type to a server unless you tap an AI feature. Ordinary typing, including in other apps, stays on your device.",
    },

    { h2: "20. Contact" },
    { p: "For questions about this Policy, or about your data, please contact us." },
    { p: "Company: Core7, Inc. — Representative: Yihuan Sun — Email: keigobutton@gmail.com" },
  ],
};
