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
                        <tr v-for="c in rooms" v-bind:key="c.id">
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
                rooms: [{id: 'asdakdaödajda', time: '12:00'}]
            }
        },
        sockets: {
            connect: () => {
                console.log('socket connected')
            },
            client_room_created: function (data) {
                console.log('received new room');
                this.rooms.push(data);
                console.log(JSON.stringify(data))
            }
        }
    }
</script>

<style scoped>

</style>
