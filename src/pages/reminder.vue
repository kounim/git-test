<template>
    <q-page class = "bg-grey-3 column">
    <div class = "row q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        class="col"
        bg-color="white"
        filled
        aria-placeholder="add task"
        dense
      >
      <template v-slot:append>
        <q-btn @click="addTask" round dense flat icon = "add"></q-btn>
      </template>
      </q-input>
    </div>

    <q-list class="bg-white" separator borderd>
      <q-item
        v-for="item in tasks"
        :key="item.title"
        @click="item.done = item.done == 'Y' ? 'N' : 'Y'"
        :class="{ 'done bg-blue-1': item.done == 'Y' }"
        v-ripple
        clickable
        >
        <q-item-section avatar>
          <q-checkbox
          v-model="item.done"
          color="primary"
          class="no-pointer-event"
          true-value="Y"
          false-value="N"
          dense
          >

          </q-checkbox>
        </q-item-section>
        <q-item-selection>
          <q-item-label>{{ item.title }}</q-item-label>
        </q-item-selection>
          <q-item-selection v-if="item.done=='Y'" side>
            <q-btn
              float
              round
              dense
              color="primary"
              icon="edit"
              @clic.stop="openDialog(item)"
              >
            </q-btn>
          </q-item-selection>
          <q-item-selection v-if="item.done=='Y'" side>
            <q-btn
              flat
              round
              dense
              color="red"
              icon="delete"
              @click.stop="removeItem(item.id)"
              >
            </q-btn>
          </q-item-selection>
      </q-item>
    </q-list>
    <dialog-custom ref="dialog" :edit-task="editTask" :origin="origin" @onInput="editTodo">
    </dialog-custom>
  </q-page>
<!--
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
-->
</template>

<script>
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

import useTodoStore from "src/stores/todo";
import {mapActions, mapState} from "pinia";
import DialogCustom from "components/DialogCustom.vue";

export default {
  name:"reminder",
  title:"리마인더",
  components:{DialogCustom},
  data(){
    return{
      newTask: "",
      editTask:null,
      origin:null,
    };
  },
  mounted() {
    this.listTodo();
  },
  computed:{
    ...mapState(useTodoStore, ["tasks"]),
  },
  methods:{
    ...mapActions(useTodoStore, ["insertTodo","listTodo","removeTodo","editTodo"]),
    async addTask(){
      if(this.newTask){
        this.insertTodo(this.newTask);
        await this.$q.notify({
          message: `${this.newTask} 추가하셨습니다`,
          icon:"home",
          color: "primary",
        });
        this.newTask="";
      }else{
        await this.$q.notify({
          message: `내용은 필수입력입니다`,
          icon:"warning",
          color: "red",
        });
      }

    },
    removeItem(id){
      this.removeTodo(id);
      this.newTask="";
    },
    openDialog(item) {
      this.$refs.dialog.dialog = true;
      this.editTask = item;
      this.origin = this.editTask.title;
    },
  }
}
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.no-tasks {
  opacity: 0.5;
}
</style>

