<template>
  <div>
    <div class="box" style="width: 275px; margin-right: 10px">
      <table class="table is-hoverable">
        <thead>
          <th><abbr title="Weekday">Weekday</abbr></th>
          <th><abbr title="Opening hours">Opened</abbr></th>
        </thead>
        <tbody v-for="(hour, day) in props.restaurantSchedule" :key="day">
          <tr>
            <th>{{ day }}</th>
            <td v-if="hour !== null">{{ hour }}</td>
            <td v-else>Closed</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  restaurantSchedule: Object,
});
</script>

<style scoped></style>
