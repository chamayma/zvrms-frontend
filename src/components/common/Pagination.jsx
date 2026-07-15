function Pagination({

    page,

    totalPages,

    onPrevious,

    onNext

}) {

    return (

        <div className="d-flex justify-content-between align-items-center mt-4">

            <button

                className="btn btn-outline-secondary"

                disabled={page === 0}

                onClick={onPrevious}

            >

                Previous

            </button>

            <span>

                Page {page + 1} of {totalPages}

            </span>

            <button

                className="btn btn-outline-secondary"

                disabled={page + 1 >= totalPages}

                onClick={onNext}

            >

                Next

            </button>

        </div>

    );

}

export default Pagination;