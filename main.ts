/** @format */

import { Vue } from "./vue";

Vue.init({
  data: {
    myVal: 1,
  },
  watch: {
    myVal(newValue, oldValue) {
      console.log(`myVal is changed (${oldValue} => ${newValue})`);
    },
  },
});

Vue.$set("myVal", 2);

Vue.$set("myVal", 3);
