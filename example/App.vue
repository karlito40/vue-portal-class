<template>
  <div id="app">
    <h1>Vue portal example</h1>

    <button @click="togglePopup">Toggle popup</button>

    <div class="relative">
      <PortalExample :showPortal="showPopup">
        <div class="popup">
          <p>I am outside of my relative container.</p> 
          <p>You can find me in #portal-root.</p>
        </div>
      </PortalExample>
    </div>
  </div>
</template>

<script>
import PortalExample from './PortalExample';

export default {
  name: 'app',
  components: {
    PortalExample
  },
  data() {
    return {
      showPopup: false
    }
  },

  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup;
    }
  }
  
}
</script>

<style>
.relative {
  border: 1px solid black;
  padding: 10px;
  position: relative;
}

.popup {
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: yellow;
  border: 2px solid black;
}
</style>
