<template>
  <div class="s-tabs" :class="{ 'is-fullwidth': expanded }">
    <nav class="s-tabs-nav" :class="navClasses">
      <ul>
        <li
          v-for="(tabItem, index) in tabItems"
          v-show="tabItem.visible"
          :key="index"
          :class="{
            'is-active': activeTab === index,
            'is-disabled': tabItem.disabled,
          }"
        >
          <a :class="itemClass" @click="tabClick(index)">
            <span>{{ tabItem.label }}</span>
          </a>
        </li>
      </ul>
    </nav>
    <section class="s-tab-content">
      <slot />
    </section>
  </div>
</template>

<script>
export default {
  name: 'BaseTabs',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    expanded: Boolean,
    position: {
      type: String,
      default: '',
    },
    animated: {
      type: Boolean,
      default: true,
    },
    itemClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      activeTab: this.value || 0,
      tabItems: [],
    }
  },
  computed: {
    navClasses() {
      return [
        this.type ? `is-${this.type}` : '',
        this.size ? `is-${this.size}` : '',
        this.position ? `is-${this.position}` : '',
        {
          'is-fullwidth': this.expanded,
          'is-toggle-rounded is-toggle': this.type === 'toggle-rounded',
        },
      ]
    },
  },
  watch: {
    value(value) {
      this.changeTab(value)
    },
    tabItems() {
      if (this.activeTab < this.tabItems.length) {
        this.tabItems[this.activeTab].isActive = true
      }
    },
  },
  mounted() {
    if (this.activeTab < this.tabItems.length) {
      this.tabItems[this.activeTab].isActive = true
    }
  },
  methods: {
    changeTab(newIndex) {
      if (this.activeTab === newIndex) return
      if (this.activeTab < this.tabItems.length) {
        this.tabItems[this.activeTab].deactivate(this.activeTab, newIndex)
      }
      if (this.tabItems[newIndex]) {
        this.tabItems[newIndex].activate(this.activeTab, newIndex)
        const oldIndex = this.activeTab
        this.activeTab = newIndex
        this.$emit('change', newIndex, oldIndex)
      }
    },
    tabClick(value) {
      this.$emit('input', value)
      this.changeTab(value)
    },
  },
}
</script>
