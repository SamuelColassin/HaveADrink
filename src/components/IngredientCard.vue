<template>
  <div class="ingredient-card">{{ ingredientName }}</div>
</template>

<script>
export default {
  name: "IngredientCard",
  props: {
    ingredientName: {
      required: true,
      type: String
    }
  }
};
</script>

<style scoped lang="scss">
.ingredient-card {
  color: $gray;
  background-color: rgba($color: $secondary, $alpha: 0.5);
  border-radius: $border-radius-sm;
  height: 3rem;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $box-shadow-sm;
  min-width: 12rem;
  margin-right: 1rem;
  padding-right: 0.8rem;
  padding-left: 0.8rem;
}
</style>
