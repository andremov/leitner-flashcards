import {
  type Category,
  type CardSet,
  type Flashcard,
  type Question,
} from "@prisma/client";

export default function DetailedView(props: {
  data: unknown;
  type: "cardset" | "category" | "flashcard" | "question";
}) {
  const { data, type } = props;

  switch (type) {
    case "cardset":
      return <CardsetDetailedView {...(data as CardSet)} />;
    case "category":
      return <CategoryDetailedView {...(data as Category)} />;
    case "flashcard":
      return <FlashcardDetailedView {...(data as Flashcard)} />;
    case "question":
      return <QuestionDetailedView {...(data as Question)} />;
  }
}

function StyledView({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className="my-2 rounded-md bg-black/50 px-4 py-2 text-white">
      {children}
    </div>
  );
}

function CardsetDetailedView(props: CardSet) {
  const { id, name } = props;

  return (
    <StyledView>
      <h3 className="mb-2 text-xl font-semibold">{name}</h3>
      <p className="mt-2 text-right text-sm text-white/50">{id}</p>
    </StyledView>
  );
}

function CategoryDetailedView(props: Category) {
  const { id, name, color } = props;
  const bgColor = `bg-${color}`;

  return (
    <StyledView>
      <h3 className="mb-2 text-xl font-semibold">{name}</h3>

      <div className={`w-52 ${bgColor} rounded-md text-center`}>Color</div>

      <p className="mt-2 text-right text-sm text-white/50">{id}</p>
    </StyledView>
  );
}

function FlashcardDetailedView(props: Flashcard) {
  const { id, description, title } = props;

  return (
    <StyledView>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>

      <div className={`text-sm text-white/60`}>Description</div>
      <div className={`w-full rounded-md text-center`}>{description}</div>

      <p className="mt-2 text-right text-sm text-white/50">{id}</p>
    </StyledView>
  );
}

function QuestionDetailedView(props: Question) {
  const { id, title, body, options, answer } = props;

  return (
    <StyledView>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>

      <div className={`text-sm text-white/60`}>Description</div>
      <div className={`w-full rounded-md text-center`}>{body}</div>

      <p className="text-sm text-white/60">Options</p>
      <div className="flex flex-col gap-1">
        {options?.map((option, index) => (
          <div
            key={index}
            className={`rounded-md border border-white/50 px-2 py-1  ${
              index === answer ? "bg-lime-500 text-black" : ""
            }`}
          >
            {["A", "B", "C", "D", "E", "F"][index]}. {option}
          </div>
        ))}
      </div>

      <p className="mt-2 text-right text-sm text-white/50">{id}</p>
    </StyledView>
  );
}
