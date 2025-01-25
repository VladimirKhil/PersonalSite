import React from 'react';

import './Pagination.scss';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	if (totalPages <= 1) {
		return null;
	}

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className="pagination">
			{pages.map((_, index) => (
				<button type='button' key={index} onClick={() => onPageChange(index)} disabled={currentPage === index}>
					{index + 1}
				</button>
			))}
		</div>
	);
};

export default Pagination;