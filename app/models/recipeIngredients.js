module.exports = (sequelize, DataTypes) => {
    const RecipeIngredient = sequelize.define("RecipeIngredient", {
        amount: DataTypes.STRING,
        measurement: DataTypes.STRING
    });

    associate = models => {
        // Create Associations that use RecipeIngredient as the Join Table
        models.Ingredient.belongsToMany(models.Recipe, { through: models.RecipeIngredient });
        models.Recipe.belongsToMany(models.Ingredient, { through: models.RecipeIngredient });
        models.Ingredient.hasMany(models.RecipeIngredient);
        models.Recipe.hasMany(models.RecipeIngredient);
        models.RecipeIngredient.belongsTo(models.Ingredient);
        models.RecipeIngredient.belongTo(models.Grant);
    };
    return RecipeIngredient;
};
