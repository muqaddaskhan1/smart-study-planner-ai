import LegalPageLayout from '@/components/LegalPageLayout';

type PrivacyPolicyProps = {
  onBack: () => void;
};

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <LegalPageLayout title="Privacy Policy" icon="shield" onBack={onBack}>
      <section>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">1. Introduction</h2>
        <p>
          Smart Study Planner AI ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our application. By creating an account or using our services, you agree to the practices described in this policy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">2. Information We Collect</h2>
        <p className="mb-3">We collect only the minimum information needed to provide our service:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Email address:</strong> Used exclusively for account authentication and to associate your study data with your account. Your email is never used for marketing or promotional purposes.</li>
          <li><strong>Full name:</strong> Used to personalize your experience and display your profile. This is optional and can be changed at any time.</li>
          <li><strong>Study plans and tasks:</strong> The subjects, exam dates, study hours, and task completion data you enter. This data is stored to provide your personalized study schedule and track your progress.</li>
          <li><strong>App settings:</strong> Your theme preference, notification settings, and reminder time. These are stored to remember your preferences across sessions.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">3. How We Use Your Email</h2>
        <p className="mb-3">Your email address serves two purposes only:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Authentication:</strong> To verify your identity when you sign in and to keep your account secure.</li>
          <li><strong>Data association:</strong> To link your study plans, tasks, and settings to your account so you can access them across devices and sessions.</li>
        </ul>
        <p className="mt-3">
          We do <strong>not</strong> use your email to send marketing emails, promotional content, or third-party offers. We do <strong>not</strong> share your email with any third-party services for advertising or tracking purposes.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">4. How We Store and Protect Your Data</h2>
        <p className="mb-3">Your data is protected through industry-standard security measures:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Encrypted passwords:</strong> Your password is never stored in plain text. It is securely hashed by our authentication provider (Supabase) using bcrypt. No one — including us — can see your password.</li>
          <li><strong>Row Level Security:</strong> Every user's study plans, tasks, profile, and settings are isolated. Database security policies ensure you can only read and write your own data. No user can access another user's information.</li>
          <li><strong>Secure transmission:</strong> All data sent between your browser and our servers is encrypted using HTTPS/TLS.</li>
          <li><strong>No password storage in the database:</strong> Passwords are handled exclusively by the authentication system and are never written to any application database table.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">5. Data We Never Sell or Share</h2>
        <p>
          We do <strong>not</strong> sell, rent, or trade your personal data to any third party. We do <strong>not</strong> share your email, name, study plans, or any other personal information with advertisers, data brokers, or analytics companies. Your data is yours and stays private to your account.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">6. Browser Notifications</h2>
        <p>
          If you enable daily study reminders, we use your browser's built-in notification system to send you a reminder at your chosen time. These notifications are handled entirely by your browser and do not involve sending any data to third-party servers. You can disable notifications at any time in Settings.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">7. Your Right to Delete Your Account and Data</h2>
        <p className="mb-3">You have full control over your data and can delete it at any time:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Delete Account:</strong> Go to Settings and select "Delete Account." This permanently deletes your profile, all study plans, all tasks, and all settings. This action cannot be undone.</li>
          <li><strong>Clear Study History:</strong> Go to Settings and select "Clear Study History" to delete all study plans and tasks while keeping your account active.</li>
          <li><strong>Sign Out:</strong> You can sign out at any time from the navbar or Settings. Your data remains saved and will be available when you sign back in.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">8. Data Retention</h2>
        <p>
          We retain your data only for as long as your account is active. When you delete your account, all associated data — including study plans, tasks, profile information, and settings — is permanently removed from our database within 30 days.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">9. Children's Privacy</h2>
        <p>
          Smart Study Planner AI is designed for university students and general learners. We do not knowingly collect personal information from children under 13 years of age. If you believe a child has provided us with personal information, please contact us so we can promptly delete it.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your data.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">11. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or how your data is handled, please reach out through the About page of the application. We are committed to addressing your privacy concerns promptly.
        </p>
      </section>
    </LegalPageLayout>
  );
}
