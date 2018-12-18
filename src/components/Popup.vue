<template>
  <div>
    <v-dialog max-width="600px" v-model="dialog">
      <v-btn flat slot="activator" class="success">Add new project</v-btn>

      <v-card>
        <v-card-title>
          <h2 class="font-weight-light">Add A New Project</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              label="Title"
              v-model="title"
              prepend-icon="folder"
              :rules="inputRules"
              required
            ></v-text-field>

            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="formattedDate"
                label="Select due date"
                prepend-icon="date_range"
                readonly
                :rules="inputRules"
              ></v-text-field>
              <v-date-picker v-model="due" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>

            <v-textarea
              label="information"
              v-model="content"
              prepend-icon="edit"
              :rules="inputRules"
            ></v-textarea>

            <v-btn flat class="success mx-0 mt-3" @click="submit()" :loading="loading">Add project</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import db from '@/fb'
import format from "date-fns/format";
export default {
  name: "Popup",

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
          this.loading = true;
        const project = {
            title : this.title,
            content : this.content,
            due: format(this.due, 'Do MMM YYYY'),
            person : "Favour Ori",
            status : "ongoing"
        }


        db.collection('projects').add(project).then(()=>{
            console.log("Project Added!")
            this.loading=false;
            this.dialog = false
            this.$emit('projectAdded')
        })


      } else {
        console.log("unable to submit form");
      }
    }
  },

  computed: {
    formattedDate() {
      return this.due ? format(this.due, "Do MMM YYYY") : "";
    }
  },

  data() {
    return {
      title: "",
      content: "",

      due: null,
      menu: false,
      modal: false,
      menu2: false,
      inputRules: [v => v.length >= 3 || "Minimum length is 3 characters"],
      date : '',
      loading : false,
      dialog : false
    };
  }
};
</script>

