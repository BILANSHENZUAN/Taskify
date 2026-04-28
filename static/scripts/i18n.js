document.addEventListener("DOMContentLoaded", () => {
    const LANGUAGE_KEY = "taskify_language";
    const supportedLanguages = new Set(["en", "zh"]);
    const errorTranslations = {
        "Username is required.": "用户名不能为空。",
        "Email is required.": "邮箱不能为空。",
        "Enter a valid email address.": "请输入有效的邮箱地址。",
        "Password must be at least 8 characters.": "密码至少需要 8 个字符。",
        "This email is already registered.": "该邮箱已被注册。",
        "Unable to create your account. Please try again.": "无法创建账户，请重试。",
        "Password is required.": "密码不能为空。",
        "Email or password is incorrect.": "邮箱或密码不正确。",
    };

    const translations = {
        en: {
            "common.languageSwitcher": "Language switcher",
            "common.switchToEnglish": "Switch to English",
            "common.switchToChinese": "切换到中文",
            "common.primaryNavigation": "Primary navigation",
            "common.socialLinks": "Social links",
            "page.home.title": "Taskify",
            "page.signup.title": "Sign Up / Login",
            "page.signup.heading": "Sign up or log in to Taskify",
            "page.dashboard.title": "Dashboard",
            "page.dashboard.heading": "Taskify dashboard",
            "page.privacy.title": "Privacy Policy",
            "nav.features": "Features",
            "nav.templates": "Templates",
            "nav.forTeams": "For Teams",
            "nav.resources": "Resources",
            "nav.pricing": "Pricing",
            "nav.signUp": "Sign Up",
            "nav.logIn": "Log In",
            "home.heroTitle": "One app to replace them all",
            "home.emailLabel": "Email address",
            "home.heroEmailPlaceholder": "Enter your email address",
            "home.getStarted": "Get Started",
            "home.featureSectionTitle": "Delightfully simple and deceptively powerful task management",
            "home.featureSectionIntro": "30 million+ people organize billions of tasks in Todoist for their work, education, and personal life.",
            "home.featureCard1Title": "With you everywhere",
            "home.featureCard1Body": "Use Todoist’s apps, extensions and widgets on any device or platform.",
            "home.featureCard1Cta": "Download apps",
            "home.featureCard2Title": "Make Todoist your own",
            "home.featureCard2Body": "Customize your to-do list with filters, labels, priorities, and more.",
            "home.featureCard2Cta": "See all features",
            "home.featureCard3Title": "Productivity method",
            "home.featureCard3Body": "Personal productivity recommendations based on your unique traits and strengths.",
            "home.featureCard3Cta": "Take the quiz",
            "home.featureCard4Title": "There’s a template for that",
            "home.featureCard4Body": "Hundreds of templates are available to get you started with whatever’s on your plate.",
            "home.featureCard4Cta": "Start with templates",
            "home.featureCard5Title": "Connect with your other tools",
            "home.featureCard5Body": "Link Todoist with your calendar, voice assistant, and 30+ other tools.",
            "home.featureCard5Cta": "Install integrations",
            "home.achievementsTitle": "A task manager you can trust for life",
            "home.achievementsIntroPrefix": "We’ve been building Todoist for 15 years and 169 days.",
            "home.achievementsIntroLink": "We're in it for the long haul.",
            "home.achievement1Label": "App downloads",
            "home.achievement2Label": "Tasks completed",
            "home.achievement3Label": "Colleges",
            "home.achievement4Label": "Pro users",
            "signup.signUp": "Sign up",
            "signup.login": "Login",
            "signup.usernameLabel": "User name",
            "signup.emailLabel": "Email address",
            "signup.passwordLabel": "Password",
            "signup.loginEmailLabel": "Login email address",
            "signup.loginPasswordLabel": "Login password",
            "signup.usernamePlaceholder": "User name",
            "signup.emailPlaceholder": "Email",
            "signup.passwordPlaceholder": "Password",
            "signup.loginEmailPlaceholder": "Enter your email",
            "signup.loginPasswordPlaceholder": "Enter password",
            "signup.submitSignUp": "Sign up",
            "signup.submitLogin": "Login",
            "dashboard.sidebar.overview": "Overview",
            "dashboard.sidebar.stats": "Stats",
            "dashboard.sidebar.projects": "Projects",
            "dashboard.sidebar.chat": "Chat",
            "dashboard.sidebar.calendar": "Calendar",
            "dashboard.sidebar.settings": "Settings",
            "dashboard.sidebar.logout": "Log out",
            "dashboard.sidebarNavigation": "Dashboard navigation",
            "dashboard.sidebarToggle": "Open dashboard navigation menu",
            "dashboard.searchLabel": "Search projects",
            "dashboard.searchButton": "Submit search",
            "dashboard.searchPlaceholder": "Search",
            "dashboard.help": "Help",
            "dashboard.notifications": "Notifications",
            "dashboard.profile": "Profile",
            "dashboard.logOut": "Log Out",
            "dashboard.userProfile": "User profile",
            "dashboard.projectsHeading": "Projects",
            "dashboard.timeRangeLabel": "Project time range",
            "dashboard.thisDay": "This Day",
            "dashboard.thisWeek": "This Week",
            "dashboard.thisMonth": "This Month",
            "dashboard.thisYear": "This Year",
            "dashboard.todo": "To do",
            "dashboard.inProgress": "In progress",
            "dashboard.completed": "Completed",
            "cookie.ariaLabel": "Cookie consent",
            "cookie.messagePrefix": "Taskify uses cookies, session storage, and local storage to keep your session active and remember your preferences. Read our",
            "cookie.messageSuffix": ".",
            "cookie.privacyLink": "Privacy Policy",
            "cookie.accept": "Accept",
            "privacy.eyebrow": "Legal Compliance",
            "privacy.title": "Privacy Policy",
            "privacy.intro": "This policy explains how Taskify handles account, session, and preference data for this course project build.",
            "privacy.informationHeading": "Information we store",
            "privacy.informationBody": "Taskify stores user account information such as username, email address, and task management related data that supports the app experience.",
            "privacy.sessionsHeading": "Sessions and preferences",
            "privacy.sessionsBody": "Taskify uses session cookies to keep authenticated users signed in, and it may use localStorage to remember preferences such as cookie consent.",
            "privacy.sharingHeading": "Data sharing",
            "privacy.sharingBody": "Taskify does not sell user data to third parties.",
            "privacy.endingHeading": "Ending a session",
            "privacy.endingBody": "Users can end an authenticated session by using the Log Out action, which clears the current session on the app.",
            "privacy.backHome": "Back to home",
            "privacy.goToSignup": "Go to sign up or login",
            "privacy.pageLinksLabel": "Privacy page links",
            "footer.lead": "Join millions of people who organize work and life with Taskify.",
            "footer.featuresHeading": "FEATURES",
            "footer.howItWorks": "How It Works",
            "footer.forTeams": "For Teams",
            "footer.pricing": "Pricing",
            "footer.templates": "Templates",
            "footer.resourcesHeading": "RESOURCES",
            "footer.downloadApps": "Download Apps",
            "footer.helpCenter": "Help Center",
            "footer.productivityMethods": "Productivity Methods",
            "footer.referFriend": "Refer a friend",
            "footer.integrations": "Integrations",
            "footer.channelPartners": "Channel Partners",
            "footer.developerApi": "Developer API",
            "footer.status": "Status",
            "footer.companyHeading": "COMPANY",
            "footer.aboutUs": "About Us",
            "footer.hiring": "We are hiring!",
            "footer.blog": "Blog",
            "footer.press": "Press",
            "footer.twist": "Twist",
            "footer.security": "Security",
            "footer.privacy": "Privacy",
            "footer.terms": "Terms",
        },
        zh: {
            "common.languageSwitcher": "语言切换",
            "common.switchToEnglish": "切换到 English",
            "common.switchToChinese": "切换到中文",
            "common.primaryNavigation": "主导航",
            "common.socialLinks": "社交链接",
            "page.home.title": "Taskify",
            "page.signup.title": "注册 / 登录",
            "page.signup.heading": "注册或登录 Taskify",
            "page.dashboard.title": "仪表盘",
            "page.dashboard.heading": "Taskify 仪表盘",
            "page.privacy.title": "隐私政策",
            "nav.features": "功能",
            "nav.templates": "模板",
            "nav.forTeams": "团队版",
            "nav.resources": "资源",
            "nav.pricing": "价格",
            "nav.signUp": "注册",
            "nav.logIn": "登录",
            "home.heroTitle": "一个应用，取代所有工具",
            "home.emailLabel": "邮箱地址",
            "home.heroEmailPlaceholder": "输入你的邮箱地址",
            "home.getStarted": "开始使用",
            "home.featureSectionTitle": "简单顺手，却拥有强大能力的任务管理",
            "home.featureSectionIntro": "三千多万用户使用 Todoist 管理工作、学习与个人生活中的海量任务。",
            "home.featureCard1Title": "随时随地陪伴你",
            "home.featureCard1Body": "通过 Todoist 的应用、扩展和小组件，在任何设备或平台上管理任务。",
            "home.featureCard1Cta": "下载应用",
            "home.featureCard2Title": "把 Todoist 变成你的专属工具",
            "home.featureCard2Body": "使用筛选器、标签、优先级等功能，自定义你的待办清单。",
            "home.featureCard2Cta": "查看全部功能",
            "home.featureCard3Title": "生产力方法",
            "home.featureCard3Body": "根据你的独特特质与优势，获取个性化的效率建议。",
            "home.featureCard3Cta": "开始测验",
            "home.featureCard4Title": "总有一个模板适合你",
            "home.featureCard4Body": "数百个模板帮助你快速开始处理手头的任务。",
            "home.featureCard4Cta": "从模板开始",
            "home.featureCard5Title": "连接你的其他工具",
            "home.featureCard5Body": "将 Todoist 与日历、语音助手以及 30 多种其他工具连接起来。",
            "home.featureCard5Cta": "安装集成",
            "home.achievementsTitle": "值得长期信赖的任务管理器",
            "home.achievementsIntroPrefix": "15 年来，Todoist 一直在持续打磨产品。",
            "home.achievementsIntroLink": "我们会长期坚持下去。",
            "home.achievement1Label": "应用下载量",
            "home.achievement2Label": "已完成任务",
            "home.achievement3Label": "合作院校",
            "home.achievement4Label": "专业版用户",
            "signup.signUp": "注册",
            "signup.login": "登录",
            "signup.usernameLabel": "用户名",
            "signup.emailLabel": "邮箱地址",
            "signup.passwordLabel": "密码",
            "signup.loginEmailLabel": "登录邮箱地址",
            "signup.loginPasswordLabel": "登录密码",
            "signup.usernamePlaceholder": "用户名",
            "signup.emailPlaceholder": "邮箱",
            "signup.passwordPlaceholder": "密码",
            "signup.loginEmailPlaceholder": "输入你的邮箱",
            "signup.loginPasswordPlaceholder": "输入密码",
            "signup.submitSignUp": "注册",
            "signup.submitLogin": "登录",
            "dashboard.sidebar.overview": "概览",
            "dashboard.sidebar.stats": "统计",
            "dashboard.sidebar.projects": "项目",
            "dashboard.sidebar.chat": "聊天",
            "dashboard.sidebar.calendar": "日历",
            "dashboard.sidebar.settings": "设置",
            "dashboard.sidebar.logout": "退出登录",
            "dashboard.sidebarNavigation": "仪表盘导航",
            "dashboard.sidebarToggle": "打开仪表盘导航菜单",
            "dashboard.searchLabel": "搜索项目",
            "dashboard.searchButton": "提交搜索",
            "dashboard.searchPlaceholder": "搜索",
            "dashboard.help": "帮助",
            "dashboard.notifications": "通知",
            "dashboard.profile": "个人资料",
            "dashboard.logOut": "退出登录",
            "dashboard.userProfile": "用户资料",
            "dashboard.projectsHeading": "项目",
            "dashboard.timeRangeLabel": "项目时间范围",
            "dashboard.thisDay": "今天",
            "dashboard.thisWeek": "本周",
            "dashboard.thisMonth": "本月",
            "dashboard.thisYear": "今年",
            "dashboard.todo": "待办",
            "dashboard.inProgress": "进行中",
            "dashboard.completed": "已完成",
            "cookie.ariaLabel": "Cookie 同意",
            "cookie.messagePrefix": "Taskify 使用 cookies、session 存储和 localStorage 来维持登录状态并记住你的偏好。请阅读我们的",
            "cookie.messageSuffix": "。",
            "cookie.privacyLink": "隐私政策",
            "cookie.accept": "接受",
            "privacy.eyebrow": "法律合规",
            "privacy.title": "隐私政策",
            "privacy.intro": "本页面说明 Taskify 在这次课程项目版本中如何处理账户、会话与偏好数据。",
            "privacy.informationHeading": "我们保存的信息",
            "privacy.informationBody": "Taskify 会保存用户名、邮箱地址等账号信息，以及支持应用体验的任务管理相关数据。",
            "privacy.sessionsHeading": "会话与偏好",
            "privacy.sessionsBody": "Taskify 使用 session cookies 维持用户登录状态，也可能使用 localStorage 记住像 Cookie 同意这样的偏好设置。",
            "privacy.sharingHeading": "数据共享",
            "privacy.sharingBody": "Taskify 不会向第三方出售用户数据。",
            "privacy.endingHeading": "结束会话",
            "privacy.endingBody": "用户可以通过使用退出登录操作来结束当前登录会话，应用会清除当前 session。",
            "privacy.backHome": "返回首页",
            "privacy.goToSignup": "前往注册或登录",
            "privacy.pageLinksLabel": "隐私页面链接",
            "footer.lead": "加入数百万使用 Taskify 管理工作与生活的人。",
            "footer.featuresHeading": "功能",
            "footer.howItWorks": "使用方式",
            "footer.forTeams": "团队版",
            "footer.pricing": "价格",
            "footer.templates": "模板",
            "footer.resourcesHeading": "资源",
            "footer.downloadApps": "下载应用",
            "footer.helpCenter": "帮助中心",
            "footer.productivityMethods": "效率方法",
            "footer.referFriend": "邀请好友",
            "footer.integrations": "集成",
            "footer.channelPartners": "渠道合作伙伴",
            "footer.developerApi": "开发者 API",
            "footer.status": "状态",
            "footer.companyHeading": "公司",
            "footer.aboutUs": "关于我们",
            "footer.hiring": "我们在招聘",
            "footer.blog": "博客",
            "footer.press": "媒体",
            "footer.twist": "Twist",
            "footer.security": "安全",
            "footer.privacy": "隐私",
            "footer.terms": "条款",
        },
    };

    function getStoredLanguage() {
        try {
            return window.localStorage.getItem(LANGUAGE_KEY);
        } catch (error) {
            return null;
        }
    }

    function setStoredLanguage(language) {
        try {
            window.localStorage.setItem(LANGUAGE_KEY, language);
        } catch (error) {
            // Ignore storage errors and fall back to the default language.
        }
    }

    function getLanguage() {
        const storedLanguage = getStoredLanguage();
        return supportedLanguages.has(storedLanguage) ? storedLanguage : "en";
    }

    function getTranslation(language, key) {
        return translations[language]?.[key] ?? translations.en[key] ?? "";
    }

    function translateText(language) {
        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.dataset.i18n;
            element.textContent = getTranslation(language, key);
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
            const key = element.dataset.i18nPlaceholder;
            element.setAttribute("placeholder", getTranslation(language, key));
        });

        document.querySelectorAll("[data-i18n-value]").forEach((element) => {
            const key = element.dataset.i18nValue;
            element.setAttribute("value", getTranslation(language, key));
        });

        document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
            const key = element.dataset.i18nAriaLabel;
            element.setAttribute("aria-label", getTranslation(language, key));
        });

        const titleElement = document.querySelector("[data-i18n-title]");
        if (titleElement) {
            const titleKey = titleElement.dataset.i18nTitle;
            const translatedTitle = getTranslation(language, titleKey);
            titleElement.textContent = translatedTitle;
            document.title = translatedTitle;
        }
    }

    function translateErrors(language) {
        document.querySelectorAll(".field-error, .form-error").forEach((element) => {
            if (!element.dataset.originalText) {
                element.dataset.originalText = element.textContent.trim();
            }

            const originalText = element.dataset.originalText;
            if (language === "zh" && errorTranslations[originalText]) {
                element.textContent = errorTranslations[originalText];
                return;
            }

            element.textContent = originalText;
        });
    }

    function updateLanguageButtons(language) {
        document.querySelectorAll("[data-language-option]").forEach((button) => {
            button.setAttribute("aria-pressed", String(button.dataset.languageOption === language));
        });
    }

    function applyLanguage(language, persist = false) {
        const nextLanguage = supportedLanguages.has(language) ? language : "en";

        if (persist) {
            setStoredLanguage(nextLanguage);
        }

        document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";
        if (document.body) {
            document.body.setAttribute("data-language", nextLanguage);
        }

        translateText(nextLanguage);
        translateErrors(nextLanguage);
        updateLanguageButtons(nextLanguage);
    }

    document.querySelectorAll("[data-language-option]").forEach((button) => {
        button.addEventListener("click", () => {
            applyLanguage(button.dataset.languageOption, true);
        });
    });

    applyLanguage(getLanguage());
});
