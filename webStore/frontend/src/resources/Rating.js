const Rating = {
  render: (numberOfStars, numReviews) => {
    if (!numberOfStars && !numReviews) {
      return `<div></div>`;
    } else {
      return `
            <div class="rating">
                <span>
                    <i class="${
                      numberOfStars >= 1
                        ? "fa fa-star"
                        : numberOfStars >= 0.5
                        ? "fa fa-star-half-alt"
                        : "fa fa-star-alt"
                    }">
                    </i>
                </span>
                <span>
                    <i class="${
                      numberOfStars >= 2
                        ? "fa fa-star"
                        : numberOfStars >= 1.5
                        ? "fa fa-star-half-alt"
                        : "fa fa-star-alt"
                    }">
                    </i>
                </span>
                <span>
                    <i class="${
                      numberOfStars >= 3
                        ? "fa fa-star"
                        : numberOfStars >= 2.5
                        ? "fa fa-star-half-alt"
                        : "fa fa-star-alt"
                    }">
                    </i>
                </span>
                <span>
                    <i class="${
                      numberOfStars >= 4
                        ? "fa fa-star"
                        : numberOfStars >= 3.5
                        ? "fa fa-star-half-alt"
                        : "fa fa-star-alt"
                    }">
                    </i>
                </span>
                <span>
                    <i class="${
                      numberOfStars >= 5
                        ? "fa fa-star"
                        : numberOfStars >= 4.5
                        ? "fa fa-star-half-alt"
                        : "fa fa-star-alt"
                    }">
                    </i>
                </span>
            <span><strong>${numReviews || ""} reviews</strong></span>
            </div>
            `;
    }
  },
};

export default Rating;
