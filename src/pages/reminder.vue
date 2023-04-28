<template>
  reminder page test

  <div class="pa-5">
          <v-row>
              <v-col cols="12" md="6" class="mb-4">
                  <v-sheet height="500">
                      <v-calendar
                              ref="calendar"
                              dark
                      ></v-calendar>
                  </v-sheet>
              </v-col>
          </v-row>
  </div>

</template>

<script>
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';


export default {
  name:"reminder",
  title:"리마인더",
}
</script>

<style>

</style>
