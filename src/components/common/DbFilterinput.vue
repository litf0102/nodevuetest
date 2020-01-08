<template>
    <el-form :inline="true" :model="formInline">

        <el-form-item label="Sex">
            <el-select v-model="formInline.sex" clearable placeholder="select sex"
                       v-on:visible-change="selectDemo">
                <el-option
                        v-for="(item, index) in type_options"
                        :key = "index"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item v-if='formInline.sex' label="Description">
            <el-input v-model="formInline.email" placeholder="Please input suffix of email"></el-input>
        </el-form-item>

        <el-form-item v-else='formInline.sex' label="Description">
            <el-input v-model="formInline.email" disabled placeholder="Please input suffix of email"></el-input>
        </el-form-item>

    </el-form>
</template>

<script>
    import lodash from 'lodash'
    import Bus from './eventBus'

    export default {
        name: 'db-filterinput',
        data() {
            return {
                type_options: [],
                formInline: {
                    sex: '',
                    email: ''
                },
                formLabelWidth: '120px'
            }
        },

        watch: {
            'formInline.sex': 'filterResultData',
            'formInline.email': 'filterResultData'
        },

        methods: { 
            selectDemo: function (params) {
                if (params) {
                    this.$axios.get("https://springvuetest.azurewebsites.net/SpringBootTest3_vue-0.0.1-SNAPSHOT/api/persons/sex")
                        .then((response) => {
                            console.log("Init dropdown");
                            this.type_options = response.data;
                            console.log(response.data);
                        }).catch(function (response) {
                        console.log(response)
                    });
                }
            },
    filterResultData: _.debounce(
    function () {
        this.$axios.get("https://springvuetest.azurewebsites.net/SpringBootTest3_vue-0.0.1-SNAPSHOT/api/persons", {
            params: {
                sex: this.formInline.sex,
                email: this.formInline.email,
            }
        }).then((response) => {
            console.log("response success.")
            console.log(response.data)
          response.data['sex'] = this.formInline.sex
          response.data['email'] = this.formInline.email
          console.log("emit send starting...")
          Bus.$emit('filterResultData', response.data)
          console.log("emit send end")
        }).catch(function (response) {
            console.log("response failed.")
          console.log(response)
        })
      },
      500
    )
  }
}

</script>
