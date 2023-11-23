import MagicPage from "../_components/magic-page";

type MagicPageProps = {
  cardset?: string;
  category?: string;
  flashcard?: string;
};

export default function AdminHome({ params }: { params: MagicPageProps }) {
  return (
    <MagicPage
      selectedCardsetId={params.cardset}
      selectedCategoryId={params.category}
      selectedFlashcardId={params.flashcard}
    />
  );
}
