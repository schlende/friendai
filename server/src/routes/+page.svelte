<script>
    import { fade, fly } from 'svelte/transition';
    import { Heart, Users, Calendar, Gift, MapPin, ChevronRight } from 'lucide-svelte';
    import { spring } from 'svelte/motion';
  
    const valueProps = [
        {
            icon: Heart,
            title: "Turn New Acquaintances into Friends",
            description: "Our AI uses relationship science to pick the perfect time and place for follow-up meetings with new acquaintances."
        },
        {
            icon: Users,
            title: "Strengthen Existing Relationships",
            description: "We suggest friends with similar interests to participate in activities they'd enjoy together."
        },
        {
            icon: Calendar,
            title: "Never Miss Important Dates",
            description: "Automatically track birthdays, anniversaries, and other special occasions."
        },
        {
            icon: Gift,
            title: "Thoughtful Gifting",
            description: "Send personalized gifts and cards to strengthen your relationships."
        },
        {
            icon: MapPin,
            title: "Location-Based Connections",
            description: "Know exactly who to connect with when you're traveling."
        },
        {
            icon: Users,
            title: "Inner Circle Focus",
            description: "Prioritize and maintain relationships with the people who matter most."
        }
    ];
  
    const steps = [
        {
            title: "Download the App",
            description: "Get started with Friend AI on your mobile device"
        },
        {
            title: "Select Your Inner Circle",
            description: "Choose the relationships you want to strengthen"
        },
        {
            title: "Let AI Work its Magic",
            description: "Our system helps build stronger connections automatically"
        }
    ];
  
    const plans = [
        {
            title: "Free",
            description: "Perfect for getting started",
            price: "0",
            popular: false,
            features: ["Basic relationship tracking", "Birthday reminders", "Limited suggestions"]
        },
        {
            title: "Pro Connector",
            description: "For active relationship builders",
            price: "30",
            popular: true,
            features: ["10 inner-circle people", "Advanced AI suggestions", "Gift coordination"]
        },
        {
            title: "Master Connector",
            description: "Unlimited relationship building",
            price: "100",
            popular: false,
            features: ["Unlimited inner-circle", "Priority support", "Custom AI training"]
        }
    ];
</script>

<style>
    .bob-animation {
        animation: bob 3s ease-in-out infinite;
    }
    .bob-animation-delayed {
        animation: bob 3s ease-in-out infinite;
        animation-delay: 1.5s;
    }
    @keyframes bob {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
</style>

<!-- Main container with a purple gradient background -->
<main class="min-h-screen bg-gradient-to-b from-purple-50 to-white">
    <div class="flex justify-center items-center pt-16">
        <svg width="128" height="19" viewBox="0 0 128 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 18.8427V0.865173H10.7865V4.46068H3.59551V8.05618H10.7865V11.6517H3.59551V18.8427H0Z" fill="#009B92"/>
            <path d="M15.1011 18.8427V0.865173H25.8876V4.46068H29.4831V8.05618H25.8876V15.2472H29.4831V18.8427H25.8876V15.2472H22.2921V11.6517H18.6966V18.8427H15.1011ZM18.6966 8.05618H25.7438V4.46068H18.6966V8.05618Z" fill="#009B92"/>
            <path d="M33.7978 18.8427V0.865173H37.3933V18.8427H33.7978Z" fill="#009B92"/>
            <path d="M41.7079 18.8427V0.865173H52.4944V4.46068H45.3034V8.05618H52.4944V11.6517H45.3034V15.2472H52.4944V18.8427H41.7079Z" fill="#009B92"/>
            <path d="M56.809 18.8427V0.865173H60.4045V4.46068H64V8.05618H67.5955V11.6517H71.191V0.865173H74.7865V18.8427H71.191V15.2472H67.5955V11.6517H64V8.05618H60.4045V18.8427H56.809Z" fill="#009B92"/>
            <path d="M79.1011 18.8427V0.865173H89.8876V4.46068H93.4831V15.2472H89.8876V18.8427H79.1011ZM82.6966 15.2472H89.7438V4.46068H82.6966V15.2472Z" fill="#009B92"/>
            <path d="M97.7978 18.8427V15.2472H101.393V18.8427H97.7978Z" fill="#009B92"/>
            <path d="M105.708 18.8427V4.46068H109.303V0.865173H116.494V4.46068H120.09V18.8427H116.494V11.6517H109.303V18.8427H105.708ZM109.303 8.05618H116.494V4.6045H109.303V8.05618Z" fill="#009B92"/>
            <path d="M124.404 18.8427V0.865173H128V18.8427H124.404Z" fill="#009B92"/>
            </svg>
            
    </div>
    <!-- Hero Section -->
    <section class="container px-6 pt-16 pb-16 mx-auto text-center">
        <div transition:fly={{ x: -200, duration: 600 }} class="max-w-3xl mx-auto relative bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-10 shadow-2xl">
            <span class="inline-block px-4 py-2 mb-6 text-sm font-medium text-purple-600 bg-purple-50 rounded-full">
                Personal AI Relationship Assistant
            </span>
            <h1 class="mb-8 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 drop-shadow-lg">
                Build And Strengthen Your Relationships
            </h1>
            <p class="mb-10 text-lg text-gray-600">
                Our AI agent turns new acquaintances into life-long friends by setting up the perfect moments for you to connect.
            </p>
            <button class="px-8 py-3 text-lg font-medium text-white bg-purple-600 rounded-lg transition-all hover:bg-purple-700 hover:scale-105">
                Sign Up Now
            </button>
            <div class="pt-12">
                <video 
                src="/friend-promo-video.mp4" 
                class="w-full h-auto rounded-lg"
                controls
                muted
                playsinline
            ></video>
            </div>
        </div>
    </section>

    <!-- Stakes Section -->
    <section class="py-16 bg-white">
        <div class="container px-6 mx-auto">
            <div transition:fly={{ x: 200, duration: 600 }} class="max-w-2xl mx-auto text-center">
                <p class="text-2xl text-purple-900 font-medium">
                    Making friends as an adult can be challenging. <br/> Don't miss out on turning chance encounters into meaningful relationships.
                </p>
                <div class="flex justify-center mt-12 mb-8 relative">
                    <img 
                        src="/smaller-phone.png" 
                        class="w-64 h-auto object-contain relative z-0 -mr-12 bob-animation" 
                        alt="Friend AI Phone Mockups"
                    />
                    <img 
                        src="/bigger-phone.png" 
                        class="w-72 h-auto object-contain relative z-10 bob-animation-delayed" 
                        alt="Friend AI Phone Mockups"
                    />
                </div>
            </div>
        </div>
    </section>

    <!-- Value Propositions -->
    <section class="py-16 bg-purple-50">
        <div class="container px-6 mx-auto">
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {#each valueProps as prop, index}
                    <div transition:fly={{ y: 200, duration: 600, delay: index * 200 }} class="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
                        <div class="flex items-center justify-center w-12 h-12 mb-4 text-purple-600 bg-purple-100 rounded-full">
                            <svelte:component this={prop.icon} class="w-6 h-6" />
                        </div>
                        <h3 class="mb-3 text-xl font-semibold text-gray-900">{prop.title}</h3>
                        <p class="text-gray-600">{prop.description}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Guide Section -->
    <section class="py-16 bg-white">
        <div class="container px-6 mx-auto">
            <div transition:fly={{ x: -200, duration: 600 }} class="max-w-3xl mx-auto text-center">
                <h2 class="mb-6 text-3xl font-bold text-gray-900">Our Story</h2>
                <p class="text-lg text-gray-600">
                    Our team of expats in Kaohsiung understands the challenges of forming new bonds when you're settling in a new place. That's what inspired Friend AI.
                </p>
            </div>
        </div>
    </section>

    <!-- How To Section -->
    <section class="py-16 bg-purple-50">
        <div class="container px-6 mx-auto">
            <h2 class="mb-12 text-3xl font-bold text-center text-gray-900">How It Works</h2>
            <div class="grid gap-8 md:grid-cols-3">
                {#each steps as step, index}
                    <div transition:fly={{ y: 200, duration: 600, delay: index * 200 }} class="relative flex flex-col items-center">
                        <div class="flex items-center justify-center w-12 h-12 mb-4 text-xl font-bold text-white bg-purple-600 rounded-full">
                            {index + 1}
                        </div>
                        <h3 class="mb-2 text-xl font-semibold text-gray-900">{step.title}</h3>
                        <p class="text-center text-gray-600">{step.description}</p>
                        {#if index < steps.length - 1}
                            <ChevronRight class="absolute top-6 -right-4 text-purple-300 hidden md:block" />
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-16 bg-white">
        <div class="container px-6 mx-auto">
            <h2 class="mb-12 text-3xl font-bold text-center text-gray-900">Choose Your Plan</h2>
            <div class="grid gap-8 md:grid-cols-3">
                {#each plans as plan, index}
                    <div transition:fly={{ y: 200, duration: 600, delay: index * 200 }} class={`p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 ${plan.popular ? 'border-2 border-purple-500 relative' : 'border border-gray-200'}`}>
                        {#if plan.popular}
                            <span class="absolute top-0 right-0 px-3 py-1 text-sm font-medium text-white transform -translate-y-1/2 bg-purple-500 rounded-full">
                                Popular
                            </span>
                        {/if}
                        <h3 class="mb-2 text-xl font-semibold text-gray-900">{plan.title}</h3>
                        <p class="mb-6 text-gray-600">{plan.description}</p>
                        <div class="mb-6">
                            <span class="text-4xl font-bold text-gray-900">${plan.price}</span>
                            <span class="text-gray-600">/month</span>
                        </div>
                        <button class={`w-full py-2 font-medium rounded-lg transition-all ${plan.popular ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'}`}>
                            Get Started
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 bg-gray-50">
        <div class="container px-6 mx-auto">
            <div class="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
                <p class="text-gray-600">© 2024 Friend AI. All rights reserved.</p>
                <div class="flex space-x-6">
                    <a href="#top" class="text-gray-600 hover:text-purple-600">About Us</a>
                    <a href="#top" class="text-gray-600 hover:text-purple-600">Privacy Policy</a>
                    <a href="#top" class="text-gray-600 hover:text-purple-600">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
</main>