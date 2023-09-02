import { useState } from "react";
import { getSimilarMeals } from "./getSimilarMeals";
import { FullMealInfo } from "../full_meal_info/FullMealInfo";
import { Session } from "next-auth";

interface Props {
  session: Session;
  mealId: number;
}

export const SimiliarRecipes = (props: Props) => {
  const [similarRecipes, setSimilarRecipes] = useState(null);
  const [showSimilar, setShowSimilar] = useState(false);
  const mealID = props.mealId;

  const getSimilarRecipes = async () => {
    setSimilarRecipes(await getSimilarMeals(mealID));
    setShowSimilar(!showSimilar);
  };

  return (
    <div>
      <button onClick={getSimilarRecipes}>{showSimilar ? "Hide Similar Recipes" : "Show Similar Recipes"}</button>
      {similarRecipes && showSimilar &&
        similarRecipes.map((recipe) => {
          interface DestructuredSimilarRecipe {
            id: number;
            title: string;
          }
          const simliarRecipe: DestructuredSimilarRecipe = recipe;
          return (
            <div key={simliarRecipe.id}>
              <h4>{simliarRecipe.title}</h4>
              <FullMealInfo mealId={simliarRecipe.id} session={props.session}/>
            </div>
          );
        })}
    </div>
  );
};
