import { Link as LinkIcon, Zap, BarChart3, Shield } from "lucide-react";
import { GetStartedButton } from "@/components/get-started-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Shorten Your Links,
              <br />
              <span className="text-primary">Amplify Your Reach</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create short, memorable links in seconds. Track clicks, analyze traffic, and manage all your links from one powerful dashboard.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <GetStartedButton size="lg" className="text-lg px-8">
              Get Started Free
            </GetStartedButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you manage and optimize your links
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<LinkIcon className="size-8" />}
            title="Quick Shortening"
            description="Transform long URLs into short, shareable links instantly with our simple interface."
          />
          <FeatureCard
            icon={<Zap className="size-8" />}
            title="Lightning Fast"
            description="Optimized for speed with instant redirects and minimal latency for the best user experience."
          />
          <FeatureCard
            icon={<BarChart3 className="size-8" />}
            title="Analytics Dashboard"
            description="Track clicks, monitor traffic sources, and gain insights with comprehensive analytics."
          />
          <FeatureCard
            icon={<Shield className="size-8" />}
            title="Secure & Reliable"
            description="Your links are protected with enterprise-grade security and 99.9% uptime guarantee."
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-card border rounded-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Why Choose Our Link Shortener?
              </h2>
              <ul className="space-y-4">
                <BenefitItem text="Unlimited link shortening with no restrictions" />
                <BenefitItem text="Detailed analytics to understand your audience" />
                <BenefitItem text="Custom branded short links for your business" />
                <BenefitItem text="Easy-to-use dashboard for all your links" />
                <BenefitItem text="Secure and reliable platform infrastructure" />
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-muted rounded-lg p-12 text-center">
                <BarChart3 className="size-32 mx-auto text-primary mb-4" />
                <p className="text-lg font-medium">Real-time Analytics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-primary text-primary-foreground rounded-lg p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who trust our platform to manage their links. Sign up now and start shortening!
          </p>
          <GetStartedButton size="lg" variant="secondary" className="text-lg px-8">
            Start Shortening Now
          </GetStartedButton>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card border rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow">
      <div className="text-primary">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <svg
        className="size-6 text-primary mt-0.5 shrink-0"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M5 13l4 4L19 7"></path>
      </svg>
      <span className="text-lg">{text}</span>
    </li>
  );
}
