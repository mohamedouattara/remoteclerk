<template>
    <div class="container">
        <section class="hero">
            <div class="hero-inner">
                <div class="hero-copy">
                    <h1 class="hero-title mt-0 is-revealing">You Call Cockpit</h1>
                    <h3>Queue</h3>
                    <table>
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="c in calls" v-bind:key="c.id">
                            <td>
                                {{c.id}}
                            </td>
                            <td>
                                <button class="button button-primary button-shadow">Answer call</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                calls: [{id: 'asdakdaödajda', time: '12:00'}]
            }
        },
    }
</script>

<style scoped>

</style>
