<script setup>
    import json from "./hardcoded_resto.json";
</script>

<template>
    <div>
        <div class="box" style="width: 250px;">
            <table class="table is-hoverable">
                <thead>
                    <th><abbr title="Weekday">Weekday</abbr></th>
                    <th><abbr title="Opening hours">Opened</abbr></th>
                </thead>
                <tbody v-for="(hour, day) in json.opening_hours" :key="day">
                    <tr>
                        <th> {{day}} </th>
                        <td> {{hour}}</td>
                    </tr>   
                </tbody>
            </table>
        </div>

    </div>
</template>

<style scoped>
</style>