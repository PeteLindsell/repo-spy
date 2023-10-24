import React from "react";
import styles from "./Pagination.module.css";

const SPACER = "...";
const MAX_ITEMS = 7;

type PaginationProps = React.HTMLAttributes<HTMLElement> & {
  currentPage: number;
  onPageChange: (newPageNumber: number) => void;
  totalPages: number;
};

export function Pagination(props: PaginationProps) {
  const { currentPage, onPageChange, totalPages, ...rest } = props;

  // Amount of items display either side of active item before spacer.
  // We need five items for the first, last, active and 2 spacers
  const extraItems = (MAX_ITEMS - 5) / 2;

  if (totalPages <= 1) return null;

  const buttonProps = (pageNumber: number) => ({
    "aria-label": `Page ${pageNumber} of ${totalPages}`,
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      onPageChange(pageNumber);
      const element = document.getElementById("page-count");
      element?.scrollIntoView({ behavior: "smooth" });
    },
    className: styles.button,
  });

  const range = (from: number, to: number) =>
    [...Array(to - from + 1)].map((_, i) => i + from);

  const paginationItems = (current: number, total: number) => {
    // Display eg: < 1 2 3 >
    if (total <= MAX_ITEMS) {
      return range(1, Math.min(total, MAX_ITEMS));
    }

    // Display eg: < 1 ... 4 ... 8 >
    if (
      current > MAX_ITEMS - (2 + extraItems) &&
      current < total - (2 + extraItems)
    ) {
      return [
        1,
        SPACER,
        ...range(current - extraItems, current + extraItems),
        SPACER,
        total,
      ];
    }

    // Display eg: < 1 2 3 ... 8 >
    if (current <= MAX_ITEMS - (2 + extraItems)) {
      return [...range(1, MAX_ITEMS - 2), SPACER, total];
    }

    // Display eg: < 1 ... 6 7 8 >
    if (current >= total - (2 + extraItems)) {
      return [1, SPACER, ...range(total - (2 + extraItems * 2), total)];
    }
  };

  return (
    <nav aria-label="Pagination" {...rest}>
      <ul className={styles.list}>
        <li>
          <button
            disabled={currentPage === 1}
            className={styles.button}
            {...(currentPage !== 1 && buttonProps(currentPage - 1))}
          >
            ◀︎
          </button>
        </li>
        {paginationItems(currentPage, totalPages)?.map((item, i) => (
          <li key={`${item}-${i}`}>
            {typeof item === "number" ? (
              <button
                aria-pressed={item === currentPage}
                {...buttonProps(item)}
              >
                {item}
              </button>
            ) : (
              <span>{item}</span>
            )}
          </li>
        ))}
        <li>
          <button
            disabled={currentPage === totalPages}
            className={styles.button}
            {...(currentPage !== totalPages && buttonProps(currentPage + 1))}
          >
            ▶︎
          </button>
        </li>
      </ul>
    </nav>
  );
}
