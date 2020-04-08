<template>
    <b-col>
        <div class="log" v-for="log in logs" v-bind:key="log.id">
            {{log.message}}
        </div>
    </b-col>
</template>

<script>
    import {EventBus} from '../Event'

    export default {
        name: "Logs",
        data() {
            return {
                logs: [],
                logCount: 0
            }
        },
        created() {
            EventBus.$on('new_log', (message) => {
                this.logs.push({id: this.logCount, message: message});
                this.logCount += 1;
            })
        },
    }
</script>

<style scoped>
    .log {
        border: 1px solid rgb(124, 129, 124);
        padding: 13px;
        margin: 3px 0px;
        background: rgb(124, 129, 124);
        color: ghostwhite;
    }
</style>
