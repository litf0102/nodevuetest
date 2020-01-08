import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {
  let test = () => {
    return true;
  };
  describe('Test', () => {
      it('Validation Test', () => {
          expect(test()).toBe(true);
      });
  })
})
