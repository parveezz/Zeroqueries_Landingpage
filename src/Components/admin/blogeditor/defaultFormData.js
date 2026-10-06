export const createDefaultFormData = () => ({
    titleEn: '',
    titleAr: '',
    slug: '',
    subtitleEn: '',
    subtitleAr: '',
    excerptEn: '',
    excerptAr: '',
    category: 'product',
    categoryEn: 'Product',
    categoryAr: 'المنتج',
    readTimeEn: '',
    readTimeAr: '',
    dateEn: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    dateAr: new Date().toLocaleDateString('ar-EG', { month: 'long', day: 'numeric', year: 'numeric' }),
    image: '',
    heroImage: '',
    isFeatured: false,
    sidebar: {
        detailsEn: [],
        detailsAr: []
    },
    contentEn: {
        aboutTitle: '',
        about: '',
        challengeTitle: '',
        challenges: [],
        solutionTitle: '',
        solutions: []
    },
    contentAr: {
        aboutTitle: '',
        about: '',
        challengeTitle: '',
        challenges: [],
        solutionTitle: '',
        solutions: []
    },
    quoteEn: {
        text: '',
        author: '',
        role: ''
    },
    quoteAr: {
        text: '',
        author: '',
        role: ''
    },
    resultsEn: [],
    resultsAr: [],
    faqs: []
});
