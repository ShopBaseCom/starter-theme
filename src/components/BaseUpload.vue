<template>
  <div class="base-upload">
    <label v-if="label" class="d-block has-text-weight-bold">{{ label }}</label>
    <div
      class="upload-box relative flex"
      :class="{
        'brdr-cl-red': validations.filter((validation) => validation.condition)
          .length,
      }"
    >
      <input
        ref="file"
        type="file"
        :disabled="disabled || progress"
        :accept="uploadAccept"
        class="input-file"
        @change="onFileChange($event.target.files)"
      />
      <div class="m0 relative flex items-center w-100">
        <button type="button" class="btn btn-outline">
          <span>Choose file</span>
        </button>
        <div class="flex-grow">
          <span class="file-name pointer">
            {{ fileName }}
          </span>

          <div v-if="progress" class="upload-progress mt8 pl12">
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <ValidationMessages v-if="validations" :validations="validations" />

    <slot />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'
export default {
  name: 'BaseUpload',
  components: {
    ValidationMessages,
  },
  props: {
    uploadAccept: {
      type: String,
      default: '*',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Boolean,
      default: false,
    },
    validations: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      fileName: 'No file chosen',
    }
  },
  watch: {
    validations() {
      // reset file name
      this.validations.forEach((validation) => {
        if (validation.text) {
          this.fileName = 'No file chosen'
          this.$refs.file.value = ''
        }
      })
    },
  },
  methods: {
    getFileName(fileName) {
      if (fileName.length > 26) {
        const file_ext = fileName.substring(fileName.lastIndexOf('.') + 1)
        this.fileName = `${fileName.substring(0, 22)}...${file_ext}`
      } else {
        this.fileName = fileName
      }
    },
    onFileChange(files) {
      if (files && files.length) {
        this.getFileName(files[0].name)
        this.$emit('input', files[0])
      } else {
        this.$emit('input', null)
        this.fileName = 'No file chosen'
      }
    },
  },
}
</script>
