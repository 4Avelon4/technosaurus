import BaseFormField from '@/components/base/BaseFormField.vue';

export default {
  props: ['title', 'error', 'placeholder'],
  components: { BaseFormField },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
