import { publish } from 'gh-pages';

publish(
	'build', // path to public directory
	{
		branch: 'gh-pages',
		repo: 'git@github.com:tyranno/my-data.git', // Update to point to your repository
		dotfiles: true
	},
	() => {
		console.log('Deploy Complete!');
	}
);
