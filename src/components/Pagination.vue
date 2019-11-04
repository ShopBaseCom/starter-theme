<template>
  <div class="pagination">
    <a
      role="button"
      href="#"
      class="pagination-previous"
      :disabled="!hasPrev"
      @click.prevent="prev"
    >
      <!-- icon -->
      <svg
        class="pagination-icon pagination-icon--left"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M14 7l-5 5 5 5V7z" />
        <path fill="none" d="M24 0v24H0V0h24z" />
      </svg>
    </a>

    <a
      role="button"
      href="#"
      class="pagination-next"
      :disabled="!hasNext"
      @click.prevent="next"
    >
      <!-- icon -->
      <svg
        class="pagination-icon pagination-icon--right"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M14 7l-5 5 5 5V7z" />
        <path fill="none" d="M24 0v24H0V0h24z" />
      </svg>
    </a>

    <ul class="pagination-list">
      <!--First-->
      <li v-if="hasFirst">
        <a
          role="button"
          href="#"
          class="pagination-link"
          @click.prevent="first"
        >
          1
        </a>
      </li>
      <li v-if="hasFirstEllipsis">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>

      <!--Pages-->
      <li v-for="page in pagesInRange" :key="page.number">
        <a
          role="button"
          href="#"
          class="pagination-link"
          :class="{ 'is-current': page.isCurrent }"
          @click.prevent="page.click"
        >
          {{ page.number }}
        </a>
      </li>

      <!--Last-->
      <li v-if="hasLastEllipsis">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="hasLast">
        <a role="button" href="#" class="pagination-link" @click.prevent="last">
          {{ pageCount }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: [Number, String],
      default: 0,
    },
    perPage: {
      type: [Number, String],
      default: 20,
    },
    current: {
      type: [Number, String],
      default: 1,
    },
    size: {
      type: String,
      default: '',
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.perPage)
    },

    hasPrev() {
      return this.current > 1
    },

    hasFirst() {
      return this.current >= 3
    },

    hasFirstEllipsis() {
      return this.current >= 4
    },

    hasLast() {
      return this.current <= this.pageCount - 2
    },

    hasLastEllipsis() {
      return (
        this.current < this.pageCount - 2 && this.current <= this.pageCount - 3
      )
    },

    hasNext() {
      return this.current < this.pageCount
    },

    pagesInRange() {
      const left = Math.max(1, this.current - 1)
      const right = Math.min(this.current + 1, this.pageCount)
      const pages = []
      for (let i = left; i <= right; i++) {
        pages.push({
          number: i,
          isCurrent: this.current === i,
          click: (event) => {
            if (this.current === i) {
              return
            }

            this.$emit('change', i)
            this.$emit('update:current', i)
            this.$nextTick(() => event.target.focus())
          },
        })
      }

      return pages
    },
  },
  watch: {
    pageCount(value) {
      if (this.current > value) {
        this.last()
      }
    },
  },
  methods: {
    prev() {
      if (!this.hasPrev) {
        return
      }

      this.$emit('change', this.current - 1)
      this.$emit('update:current', this.current - 1)
    },

    first() {
      this.$emit('change', 1)
      this.$emit('update:current', 1)
    },

    last() {
      this.$emit('change', this.pageCount)
      this.$emit('update:current', this.pageCount)
    },

    next() {
      if (!this.hasNext) {
        return
      }

      this.$emit('change', this.current + 1)
      this.$emit('update:current', this.current + 1)
    },
  },
}
</script>
