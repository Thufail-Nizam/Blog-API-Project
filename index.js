import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;


let posts = [
  {
    id: 1,
    title: "Frankenstein Movie Review",
    content:
      "There’s this canard that some critics like to throw around that artists should actually avoid realizing their “dream projects,” because whatever reality they achieve will not only not match their dream, but it will disappoint whatever audience to which the dream is presented. Guillermo Del Toro’s “Frankenstein” is a breathtaking coup, an exhilarating riposte to the conventional wisdom about dream projects. The writer-director makes something almost new, and definitely rich and strange, out of a story we all thought we knew well.The 21st-century movie does so by keeping close to its 19th-century source. Not precisely close—Mary Shelley’s novel was complete as of 1818, and the movie is set in 1857, which is several years after the author’s own death. Placing the tale squarely in the Victorian era grounds it in period trappings more familiar to the contemporary viewer, one supposes; it also allows its visionary (at least at first) scientist Victor Frankenstein (Oscar Isaac) to place electricity more fully at his disposal when animating his creature. But Del Toro’s scenario is thoroughly inspired by the original. The movie begins near the novel’s end, in the Arctic, where creator and creation have been switching roles of hunter and hunted. But the filmmaker spins out the tale in ways that make the movie not just jarring and frightening in the best horror tradition, but heartbreakingly poignant, expanding the humanity James Whale achieved for in his classic 1930s “Frankenstein” pictures, “Frankenstein” and “Bride of Frankenstein.”",
    author: "Glenn Kenny",
    date: "November 7, 2025",
  },
  {
    id: 2,
    title: "Perfect Protein Pancakes Recipe",
    content:
      "I absolutely love the first meal of the day — I usually wake up hungry and ready to kick things off with a really tasty meal. I usually eat a savoury breakfast — I love dishes like avocado and poached eggs on toast — but I know how many people in the Sweat Community enjoy pancakes, so I thought I would share a recipe for all you ladies who like something sweeter! While I don’t use protein powder, I know many women do, so this is included in the ingredients. If you want to substitute protein powder for something else you can try this recipe with cacao powder which will give you a chocolate flavour instead.",
    author: "Kayla Itsines",
    date: "August 10, 2020",
  },
  {
    id: 3,
    title: "Health and Wealth: The Importance for Lifestyle Medicine",
    content:
      "Many people spend years dreaming about their retirement. Unfortunately, today’s workers will likely work longer, suffer greater economic uncertainty, and might have poorer health status compared with retirees in previous generations. Preserving good health during the working years is associated with a more consistent employment record, greater financial resources, and reduced risk of disease. Making smart financial decisions as a younger adult also translates to improved finances in retirement. While many people are aware of these relationships, many continue to make poor health choices. Employers and lifestyle medicine professionals can both work to improve financial well-being in retirement.",
    author: "Wayne N Burton",
    date: "2021 Apr 3",
  },
];

let lastId = 3;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});


app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});


app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
