<script>
  import { suggestionDetail } from "../Store";
</script>

<div class="root center">

  <div class="title row space-between">
    <h1>{$suggestionDetail.title}</h1>
    <div class="metascore">
      <p class="text-center">Popularity</p>
      <h2 class="text-center">{$suggestionDetail.upvotes}</h2>
    </div>
  </div>

  <hr />

  <div class="row space-between">
    <p>Last Activity: {$suggestionDetail.lastActivityDateTime}</p>
    <a href="{window.location.href.split('?')[0] + `?suggestionId=${$suggestionDetail.id}`}"><p><u>Share Link</u></p></a>
    <p>Created: {$suggestionDetail.createdDateTime}</p>
  </div>

  <hr />

  <div class="details">
    <p>{@html $suggestionDetail.detail}</p>
  </div>

</div>

<style>
  .root {
    width: 100%;
    background-color: var(--panel-bg);
    border-radius: 12px;
    padding: 24px;
  }

  h1,
  h2 {
    color: #000;
  }

  p {
    color: #000;
  }

  .text-center {
    text-align: center;
  }

  .metascore h2,
  .metascore p {
    margin: 0;
  }

  @media screen and (max-width: 600px) {
    .title.row.space-between {
      text-align: center;
      flex-direction: column;
    }

    h2 {
      font-size: 1.3em;
    }

    p {
      font-size: 0.7rem;
    }
  }

</style>
