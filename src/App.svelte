<script lang="ts">
  import { applyOperation, getRandomInteger } from "./utils";

  let isAnswearShown = false;
  let difficulty = 1;
  $: problem = generateMathProblem(difficulty);

  const onShowAnswer = () => (isAnswearShown = true);
  const onRetry = () => (
    (isAnswearShown = false), (problem = generateMathProblem(difficulty))
  );

  function generateMathProblem(difficulty) {
    if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 9) {
      return {};
    }

    const variablePower = [3, 6, 9].findIndex((n) => difficulty <= n);
    const variablesCount = ((difficulty - 1) % 3) + 2;

    console.log({ variablePower, variablesCount });

    const variables = Array.from({ length: variablesCount }, () => {
      const from = Math.pow(10, variablePower);
      return getRandomInteger({ from, upTo: from * 10 });
    });

    const operations = Array.from(
      { length: variablesCount - 1 },
      () => ["+", "-"][getRandomInteger({ from: 0, upTo: 2 })]
    );

    const question = [
      ...operations.map((op, i) => variables[i] + op),
      ...variables.slice(-1),
    ].join("");

    const answer = operations.reduce(
      (acc, op, i) =>
        applyOperation({ x: acc, y: variables[i + 1], operation: op }),
      variables[0]
    );

    return { question, answer };
  }
</script>

<main>
  <label>
    difficulty:
    <input type="number" min="1" max="9" bind:value={difficulty} />
  </label>

  <p>
    question: <br />
    <strong>
      {problem.question}
    </strong>
  </p>

  {#if isAnswearShown}
    <p>
      answer: <br />
      <strong>
        {problem.answer}
      </strong>
    </p>

    <button on:click={onRetry}>retry</button>
  {:else}
    <button on:click={onShowAnswer}>show answer</button>
  {/if}
</main>

<style lang="scss">
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    background-color: #000;
  }

  main {
    background-color: #eee;

    text-align: center;
    padding: 1rem;
    margin: 0 auto;

    font-size: 2.4rem;

    width: 360px;

    border: 2px solid black;
  }

  input[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    -moz-appearance: textfield;

    font-size: 2.4rem;
    text-align: center;
    max-width: min(2ch, 100%);
  }

  button {
    border: none;
    border-radius: 0.1em;

    background-color: orange;
    color: white;

    font-size: inherit;
    padding: 0.1em 0.6em;

    text-transform: uppercase;

    margin-bottom: 2rem;

    transition: 0.1s filter;
    &:hover {
      filter: saturate(10);
    }
  }
</style>
