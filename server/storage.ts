import { Recipe, User, type InsertUser, type InsertRecipe } from "@shared/schema";
import { recipeData } from "@shared/recipeData";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getRecipes(): Promise<Recipe[]>;
  getRecipeById(id: number): Promise<Recipe | undefined>;
  getRecipesByCategory(category: string): Promise<Recipe[]>;
  getRecipesByIngredients(ingredients: string[]): Promise<Recipe[]>;
  toggleFavorite(userId: number, recipeId: number): Promise<User>;
  getFavorites(userId: number): Promise<Recipe[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private recipes: Map<number, Recipe>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.recipes = new Map();
    this.currentId = 1;

    // Initialize with recipe data
    recipeData.forEach(recipe => {
      this.recipes.set(recipe.id, recipe);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, favorites: [] };
    this.users.set(id, user);
    return user;
  }

  async getRecipes(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }

  async getRecipeById(id: number): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }

  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    return Array.from(this.recipes.values()).filter(recipe => 
      recipe.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
    );
  }

  async getRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
    const lowerCaseIngredients = ingredients.map(ing => ing.toLowerCase());
    
    // Get all recipes
    const allRecipes = Array.from(this.recipes.values());
    
    // Map each recipe to an object with recipe and matching ingredient count
    const recipesWithMatches = allRecipes.map(recipe => {
      const recipeIngredients = recipe.ingredients.map(
        ing => ing.name.toLowerCase()
      );
      
      const matchCount = lowerCaseIngredients.filter(ingredient => 
        recipeIngredients.some(ri => ri.includes(ingredient))
      ).length;
      
      return {
        recipe,
        matchCount,
        totalIngredients: recipe.ingredients.length,
        matchPercentage: (matchCount / recipe.ingredients.length) * 100
      };
    });
    
    // Filter recipes with at least one matching ingredient and sort by match percentage
    return recipesWithMatches
      .filter(item => item.matchCount > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .map(item => item.recipe);
  }

  async toggleFavorite(userId: number, recipeId: number): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const newFavorites = [...user.favorites];
    const favoriteIndex = newFavorites.indexOf(recipeId);
    
    if (favoriteIndex === -1) {
      // Add to favorites
      newFavorites.push(recipeId);
    } else {
      // Remove from favorites
      newFavorites.splice(favoriteIndex, 1);
    }
    
    const updatedUser = { ...user, favorites: newFavorites };
    this.users.set(userId, updatedUser);
    
    return updatedUser;
  }

  async getFavorites(userId: number): Promise<Recipe[]> {
    const user = await this.getUser(userId);
    if (!user) {
      return [];
    }
    
    return user.favorites
      .map(recipeId => this.recipes.get(recipeId))
      .filter((recipe): recipe is Recipe => recipe !== undefined);
  }
}

export const storage = new MemStorage();
