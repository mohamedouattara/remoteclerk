<template>
    <div>
        <main>
            <section class="hero">
                <div class="hero-left-decoration is-revealing"></div>
                <div class="hero-right-decoration is-revealing"></div>
                <div class="container">
                    <div class="hero-inner">
                        <div class="hero-copy">
                            <h1 class="hero-title mt-0 is-revealing">Video consultation for retailers</h1>
                            <p class="hero-paragraph is-revealing">Bring your expertise from the store to your customers home</p>
                            <p class="hero-cta mb-0 is-revealing">
                                <a class="button button-primary button-shadow" v-if="loggedIn" href="#/profile">Get started</a>
                                <a class="button button-primary button-shadow" v-if="!loggedIn" href="#/admin">Get started</a>
                            </p>
                        </div>
                        <div class="hero-illustration">
                        </div>
                    </div>
                </div>
            </section>
            <section class="features section text-center">
                <div class="container">
                    <div class="features-inner section-inner has-top-divider">
                        <b-row class="justify-content-center">
                            <b-col class="col-md-8 col-12">
                                <h2 class="section-title mt-0">Problem</h2>
                                <p class="section-paragraph mb-0">Covid-19 is going to push the retail marketplace faster than it has been
                                    moving
                                    toward a more remote experience. Stores and showrooms are closed but online shops are still open.
                                    However, product categories like furniture or sports gear usually require consultation by an experienced
                                    shop-employee before the purchase. </p>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="features-inner section-inner has-top-divider">
                        <div class="teaser-img">
                            <img src="@/assets/sample_img.png"/>
                        </div>
                        <div class="features-header text-center">
                            <div class="container-sm">
                                <h2 class="section-title mt-0">Benefits</h2>
                            </div>
                        </div>
                        <div class="features-wrap">
                            <div class="feature is-revealing">
                                <div class="feature-inner">
                                    <h2>⏰</h2>
                                    <h4 class="feature-title">Outside opening hours</h4>
                                    <p class="text-sm">Offer your expertise to the people at home even if your store is already closed</p>
                                </div>
                            </div>
                            <div class="feature is-revealing">
                                <div class="feature-inner">
                                    <h2>👨‍💼</h2>
                                    <h4 class="feature-title">Offer expertise</h4>
                                    <p class="text-sm">Offer additional information about the material or functionality of a
                                        product. The customer gets the same experience as he would get it in the real shop.</p></div>
                            </div>
                            <div class="feature is-revealing">
                                <div class="feature-inner">
                                    <h2>🛒 </h2>
                                    <h4 class="feature-title">Up-/Crosselling</h4>
                                    <p class="text-sm">Suggest additional, complementary or higher-end products to your customer.</p>
                                </div>
                            </div>
                            <div class="feature is-revealing">
                                <div class="feature-inner">
                                    <h2>❌ </h2>
                                    <h4 class="feature-title">No App installation</h4>
                                    <p class="text-sm">No app installation needed - everything is web-based. Works on smartphonse,
                                        tablet and desktop.</p>
                                </div>
                            </div>
                            <div class="feature is-revealing">
                                <div class="feature-inner">
                                    <h2>📑</h2>
                                    <h4 class="feature-title">No Sign-Up required</h4>
                                    <p class="text-sm">The user does not need to sign-up and stays anonymous.</p>
                                </div>
                            </div>
                            <div class="feature is-revealing">
                                <div class="feature-inner">
                                    <h2>🖥️</h2>
                                    <h4 class="feature-title">Easy to integrate</h4>
                                    <p class="text-sm">Easy to integrate widget for every online-shop.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="pricing section">
                <div class="container">
                    <div class="pricing-inner section-inner">
                        <div class="features-inner section-inner has-top-divider">
                            <div class="features-header text-center">
                                <h2 class="section-title mt-0 text-center">Pricing</h2>
                                <div class="container-sm">
                                    <p class="section-paragraph mb-0">
                                        We want to help businesses during these difficult times. That's why our service is completely free.
                                        However,
                                        the video-software we are using charges a few pennies for each call. You pay only as much as your
                                        customers
                                        use it.</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="pricing-tables-wrap">
                                <div class="pricing-table is-revealing">
                                    <div class="pricing-table-inner">
                                        <div class="pricing-table-main">
                                            <div class="pricing-table-header mb-24 pb-24">
                                                <div class="pricing-table-title h4 mt-0 mb-16">Per customer call</div>

                                            </div>
                                            <ul class="pricing-table-features list-reset text-xs">
                                                <li>
                                                    <span>No recurring fees</span>
                                                </li>
                                                <li>
                                                    <span>Pay as you use</span>
                                                </li>
                                                <li>
                                                    <span>No hidden costs</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="pricing-table-cta">
                                            <a class="button button-secondary button-shadow button-block" href="#/admin">Apply for beta</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="cta section">
                <div class="container">
                    <div class="cta-inner section-inner is-revealing">
                        <h3 class="section-title mt-0">Still not convinced?</h3>
                        <div class="cta-cta">
                            <a class="button button-primary button-shadow" href="mailto:info@adriankrebs.ch">Schedule a live demo</a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: 'Home',
        components: {},
        computed: {
            ...mapState(['loggedIn']),
        },
        mounted() {
            const accordionEl = document.getElementsByClassName('accordion-title')

            if (accordionEl.length) {
                for (let i = 0; i < accordionEl.length; i++) {
                    accordionEl[i].addEventListener('click', function () {
                        this.parentNode.classList.toggle('is-open')
                        const panel = this.nextElementSibling
                        if (panel.style.maxHeight) {
                            panel.style.maxHeight = null
                        } else {
                            panel.style.maxHeight = `${panel.scrollHeight}px`
                        }
                    })
                }
            }
        }
    }
</script>
<style lang="scss">
    .teaser-img {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
        img {
            max-height: 500px;
        }
    }
</style>
