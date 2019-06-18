<template>
    <v-form
        ref="form"
    >
        <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
            >
        </v-text-field>
    </v-form>
</template>

<script>
export default {
    name: 'PlaylstEditor'
}
</script>

