module.exports = function(grunt) {

  grunt.initConfig({

    uglify : {
      options: {
        // Banner inserted at the beginning of the output file
        banner: '/* Author: Stefano Marseglia (stefano.marseglia@epsilonline.com). Build date: <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> */\n'
      },
      dist: {
        // files: {
        //   'build/js/*.min.js': ['src/js/*.js']
        // }
        files: [
          {
            expand: true,
            cwd: 'src/js/',
            src: ['*.js'],
            dest: 'build/js',
            ext: '.min.js',
            extDot: 'first'
          }
        ]
      }
    },

    copy: {
      dist: {
        files: [
          {expand: true, cwd: 'src/', src: ['*','!*.ini'], dest: 'build', filter: 'isFile'}
        ]
      }
    },

    compress: {
      package: {
        options: {
          mode: 'zip',
          archive: 'package/frontend.zip'
        },
        files : [
          {expand: true, cwd: 'build/', src: ['**/*','!**/*.ini'], dest: 'package'}
        ]
      }
    },

    connect: {
      server: {
        options: {
          port: 8080,
          base: {
            path: 'build',
            options: {
              index: 'index.html'
            }
          },
          keepalive: true,
          useAvailablePort: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Quando si lancia il comando grunt senza specificare il goal, viene eseguito 'default', che prevede di eseguire i task passati come secondo argomento
  grunt.registerTask('default', ['uglify','copy']);
  grunt.registerTask('package', ['uglify','copy','compress']);

}
