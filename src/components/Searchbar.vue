<template>
  <div>
    <div id="searchbar-section">
      <div class="searchbar-container">
        <div class="searchbar-text">What do you have ?</div>
        <div class="searchbar">
          <input @input="showPossibilities" v-model="searchedIngredient" />
          <i id="search-btn" class="search icon big btn"></i>
          <i id="add-btn" class="plus icon big btn" @click="addIngredient"></i>
        </div>
        <ul id="possibilities"></ul>
      </div>
    </div>
    <div class="ingredient-list">
      <div v-for="ingredient in ingredients" :key="ingredient.key">
        <IngredientCard :ingredientName="ingredient" />
      </div>
    </div>
  </div>
</template>

<script>
import IngredientCard from "./IngredientCard.vue";

// import { TimelineMax, Power2 } from "gsap";

export default {
  name: "Searchbar",
  components: {
    IngredientCard
  },
  data() {
    return {
      searchedIngredient: "",
      ingredients: [],
      availableIngredients: [],
      searchArray: []
    };
  },
  mounted() {
    this.$http({
      method: "GET",
      url: "https://the-cocktail-db.p.rapidapi.com/list.php",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
        "x-rapidapi-key": "d1340682a4msh4271c967e8c993fp166a1cjsnf2a3e735ffd9"
      },
      params: {
        i: "list"
      }
    }).then(res => {
      res.data.drinks.forEach(element => {
        this.availableIngredients.push(element.strIngredient1);
        this.searchArray.push(element.strIngredient1.toLowerCase());
      });
    });
  },
  methods: {
    addIngredient() {
      if (this.searchArray.includes(this.searchedIngredient.toLowerCase())) {
        this.ingredients.push(this.formatIngredient(this.searchedIngredient));
        this.searchedIngredient = "";
        document.getElementById("search-btn").style.display = "block";
        document.getElementById("add-btn").style.display = "none";
      }
    },
    showPossibilities() {
      const possibilities = document.getElementById("possibilities");
      this.removeNodes(possibilities);

      const filteredList = this.searchArray.filter(ingredient => {
        return ingredient.match("^" + this.searchedIngredient.toLowerCase());
      });

      if (
        filteredList.length != this.searchArray.length &&
        filteredList.length != 0
      ) {
        possibilities.style.display = "block";
        this.createNodes(filteredList, "possibilities");
      } else {
        possibilities.style.display = "none";
      }
    },
    formatIngredient(word) {
      return (
        word.charAt(0).toUpperCase() + word.slice(1, word.length).toLowerCase()
      );
    },
    removeNodes(parent) {
      var child = parent.lastElementChild;
      while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
      }
    },
    createNodes(list, parent) {
      list.forEach(element => {
        var node = document.createElement("li");
        const formated = this.formatIngredient(element);
        var textnode = document.createTextNode(formated);
        node.appendChild(textnode);
        node.onclick = () => {
          this.searchedIngredient = formated;
          this.changeToAddLayout();
        };
        node.onmouseout = () => {
          node.style.color = "#707070";
        };
        node.onmouseover = () => {
          node.style.color = "#CC6329";
        };
        node.style.cursor = "pointer";
        document.getElementById(parent).appendChild(node);
      });
    },
    changeToAddLayout() {
      document.getElementById("possibilities").style.display = "none";
      document.getElementById("search-btn").style.display = "none";
      document.getElementById("add-btn").style.display = "block";
    }
  }
};
</script>

<style scoped lang="scss">
#searchbar-section {
  display: grid;
  grid-template-columns: 30% 1fr 30%;
  margin-top: 2rem;

  .searchbar-container {
    grid-column: 2/3;
    position: relative;
    width: 100%;
  }

  .searchbar {
    display: grid;
    grid-template-columns: 90% 1fr;
    background-color: $secondary;
    border: 0.5rem solid $primary;
    border-radius: $border-radius;
    height: 3.5rem;
    width: auto;
    box-shadow: $box-shadow;
  }

  .searchbar input {
    grid-column: 1/2;
    color: $white;
    background-color: $secondary;
    border: none;
    overflow: hidden;
    font-size: 2.5rem;
    margin: 0.2rem 1rem 0.2rem 1rem;
  }

  .searchbar-text {
    margin-bottom: 0.3rem;
  }

  .btn {
    color: $white;
    grid-column: 2/3;
    margin: auto;
    cursor: pointer;
  }

  #possibilities {
    background-color: $white;
    box-shadow: $box-shadow-sm;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 6.2rem;
    left: 0.7rem;
    width: 93%;
    border: 1px solid $gray;
    border-radius: $border-radius-sm;
    padding: 1rem;
    display: none;
    list-style: none;
    margin-top: 0;

    ul li {
      margin-bottom: 0.5rem;
    }
  }

  #add-btn {
    display: none;
  }

  [contenteditable]:focus {
    outline: 0px solid transparent;
  }
}

.ingredient-list {
  display: flex;
  margin-top: 2.5rem;
  justify-content: center;
}

@media screen and (max-width: 992px) {
  #searchbar-section {
    grid-template-columns: 15% 1fr 15%;
  }
}
</style>
